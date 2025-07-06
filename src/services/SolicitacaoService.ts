import Solicitacao from '@models/Solicitacao';
import Viagem from '@models/Viagem';
import { Op } from 'sequelize';
import { NotFoundError, BadRequestError } from '@utils/Errors';
import { criarNotificacao } from '@utils/notificacaoUtils';
import Usuario from '@models/Usuario';
import Transporte from '@models/Transporte';

export class SolicitacaoService {
    // Buscar todas as solicitações de um usuário
    static async getSolicitacoesPorUsuario(idUsuario: number) {
        return await Solicitacao.findAll({ where: { idUsuario } });
    }

    // Buscar todas as solicitações de uma viagem
    static async getSolicitacoesPorViagem(idViagem: number) {
        return await Solicitacao.findAll({ where: { idViagem } });
    }

    // Buscar todas as solicitações de uma viagem para o card
    static async getSolicitacoesViagemToCard(idUsuario: number) {
        // Busca todas as solicitações do usuário
        const solicitacoes = await Solicitacao.findAll({
            where: { idUsuario, inseridoNaViagem: 1 },
            include: [
                {
                    model: Viagem,
                    as: 'viagem',
                    include: [
                        {
                            model: Usuario,
                            as: 'criador', // ajuste conforme associação
                            attributes: ['nome']
                        },
                        {
                            model: Transporte,
                            as: 'transportes', // ajuste conforme associação
                            attributes: ['tipoTransporte']
                        }
                    ]
                }
            ]
        });

        // Monta o retorno no formato desejado
        return solicitacoes.map((solicitacao: any) => {
            const viagem = solicitacao.viagem;
            console.log(viagem);
            return {
                id: viagem.id,
                nome: viagem.nome,
                imagem: "/images-my_trips/rifaina.png",
                dataInicio: viagem.dataInicio,
                dataFim: viagem.dataFim,
                codigoConvite: viagem.codigoConvite,
                cidadeOrigem: viagem.cidadeOrigem,
                cidadeDestino: viagem.cidadeDestino,
                organizador: viagem.criador?.nome ?? "",
                transporte: viagem.transportes?.[0]?.tipoTransporte ?? "",
                papel: solicitacao.papel,
                status: solicitacao.status
            };
        });
    }

    static async criarSolicitacao(idViagem: number, idUsuario: number) {
        // Buscar a viagem que está sendo solicitada
        const viagemSolicitada = await Viagem.findByPk(idViagem);

        if (!viagemSolicitada) {
            throw new NotFoundError("A viagem solicitada não existe.");
        }

        // Verificar se o usuário já possui uma solicitação ou participação em viagens com conflito de datas
        await this.validarConflitoSolicitacao(idUsuario, viagemSolicitada);

        // Criar a nova solicitação
        const solicitacao = await Solicitacao.create({
            idViagem: idViagem,
            idUsuario: idUsuario,
            papel: "participante",
            status: 1,
            inseridoNaViagem: 0,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });

        const organizadorId = viagemSolicitada.criadorId;
        if (!organizadorId) {
            throw new Error("Viagem não tem organizador vinculado.");
        }

        const solicitante = await Usuario.findByPk(idUsuario);
        if (!solicitante) {
            throw new NotFoundError("Usuário solicitante não encontrado.");
        }

        // Chama a função utilitária 🚀
        await criarNotificacao({
            userId: organizadorId,
            viagemId: idViagem,
            tipo: "solicitacao_participacao",
            mensagem: `O usuário ${solicitante.nome} solicitou participar da viagem`,
        });

        return solicitacao;
    }

    static async criarSolicitacaoCriadorViagem(idViagem: number, idUsuario: number) {
        const viagemSolicitada = await Viagem.findByPk(idViagem);

        if (!viagemSolicitada) {
            throw new NotFoundError("A viagem solicitada não existe.");
        }

        // Validação extraída
        await this.validarConflitoSolicitacao(idUsuario, viagemSolicitada);

        // Criar a solicitação como organizador e status 1
        return await Solicitacao.create({
            idViagem: idViagem,
            idUsuario: idUsuario,
            papel: "organizador",
            status: 1,
            inseridoNaViagem: 1,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });
    }

    static async promoverOuDespromoverOrganizadorSolicitacao(idViagem: number, idUsuarioOrganizador: number, idUsuarioSolicitante: number) {
        // Verifica se o usuário solicitante já é um organizador
        const solicitacaoSolicitante = await Solicitacao.findOne({
            where: {
                idViagem,
                idUsuario: idUsuarioSolicitante,
            },
        });

        if (!solicitacaoSolicitante) {
            throw new NotFoundError("Solicitação do usuário solicitante não encontrada.");
        }

        // Atualiza o papel do solicitante para organizador ou vice-versa
        solicitacaoSolicitante.papel = solicitacaoSolicitante.papel === "organizadorPromovido" ? "participante" : "organizadorPromovido";
        await solicitacaoSolicitante.save();

        return solicitacaoSolicitante;
    }
    // Atualizar o status de uma solicitação
    static async atualizarInseridoSolicitacao(idViagem: number, idUsuario: number) {
        const solicitacao = await Solicitacao.findOne({ where: { idViagem, idUsuario } });

        if (!solicitacao) {
            throw new NotFoundError("Solicitação não encontrada.");
        }

        // Inverte o status: se for 1 vira 0, se for 0 vira 1
        solicitacao.inseridoNaViagem = solicitacao.inseridoNaViagem === 1 ? 0 : 1;
        solicitacao.dataAtualizacao = new Date(); // Atualiza a data de modificação
        await solicitacao.save();

        return solicitacao;
    }

    private static async validarConflitoSolicitacao(idUsuario: number, viagemSolicitada: any) {
        const conflitos = await Solicitacao.findAll({
            where: { idUsuario },
            include: [
                {
                    model: Viagem,
                    as: 'viagem',
                    where: {
                        [Op.or]: [
                            {
                                dataInicio: {
                                    [Op.between]: [viagemSolicitada.dataInicio, viagemSolicitada.dataFim],
                                },
                            },
                            {
                                dataFim: {
                                    [Op.between]: [viagemSolicitada.dataInicio, viagemSolicitada.dataFim],
                                },
                            },
                            {
                                [Op.and]: [
                                    { dataInicio: { [Op.lte]: viagemSolicitada.dataInicio } },
                                    { dataFim: { [Op.gte]: viagemSolicitada.dataFim } },
                                ],
                            },
                        ],
                    },
                },
            ],
        });

        if (conflitos.length > 0) {
            throw new BadRequestError("O usuário já possui uma solicitação ou participação em uma viagem com conflito de datas.");
        }
    }

    static async encerrarViagem(idViagem: number) {
        const solicitacoes = await Solicitacao.findAll({ where: { idViagem } });

        if (solicitacoes.length === 0) {
            throw new NotFoundError("Nenhuma solicitação encontrada para esta viagem.");
        }

        // Atualiza todas as solicitações da viagem para status = 0
        await Solicitacao.update(
            {
                status: 0,
                dataAtualizacao: new Date()
            },
            { where: { idViagem } }
        );

        return { message: `${solicitacoes.length} solicitações foram inativadas para a viagem ${idViagem}` };
    }

    static async excluirSolicitacao(idViagem: number, idUsuario: number) {
        const solicitacao = await Solicitacao.findOne({ where: { idViagem, idUsuario } });

        if (!solicitacao) {
            throw new NotFoundError("Solicitação não encontrada.");
        }

        await solicitacao.destroy();

        return { message: "Solicitação excluída com sucesso." };
    }
}