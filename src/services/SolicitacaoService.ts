import Solicitacao from '@models/Solicitacao';
import Viagem from '@models/Viagem';
import { Op } from 'sequelize';
import { NotFoundError, BadRequestError } from '@utils/Errors';

export class SolicitacaoService {
    // Buscar todas as solicitações de um usuário
    static async getSolicitacoesPorUsuario(idUsuario: number) {
        return await Solicitacao.findAll({ where: { idUsuario } });
    }

    // Buscar todas as solicitações de uma viagem
    static async getSolicitacoesPorViagem(idViagem: number) {
        return await Solicitacao.findAll({ where: { idViagem } });
    }

    static async criarSolicitacao(idViagem: number, idUsuario: number) {
        // Buscar a viagem que está sendo solicitada
        const viagemSolicitada = await Viagem.findByPk(idViagem);

        if (!viagemSolicitada) {
            throw new NotFoundError("A viagem solicitada não existe.");
        }

        // Verificar se o usuário já possui uma solicitação ou participação em viagens com conflito de datas
        const conflitos = await Solicitacao.findAll({
            where: { idUsuario },
            include: [
                {
                    model: Viagem,
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

        // Criar a nova solicitação
        return await Solicitacao.create({
            idViagem: idViagem,
            idUsuario: idUsuario,
            papel: "participante",
            status: 0,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });
    }

    // Atualizar o status de uma solicitação
    static async atualizarStatusSolicitacao(idViagem: number, idUsuario: number) {
        const solicitacao = await Solicitacao.findOne({ where: { idViagem, idUsuario } });

        if (!solicitacao) {
            throw new NotFoundError("Solicitação não encontrada.");
        }

        // Inverte o status: se for 1 vira 0, se for 0 vira 1
        solicitacao.status = solicitacao.status === 1 ? 0 : 1;
        solicitacao.dataAtualizacao = new Date(); // Atualiza a data de modificação
        await solicitacao.save();

        return solicitacao;
    }
}