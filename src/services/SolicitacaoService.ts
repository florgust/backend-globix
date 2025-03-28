import Solicitacao from "../model/Solicitacao";
import Viagem from "../model/Viagem";
import { Op } from "sequelize";

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
            throw new Error("A viagem solicitada não existe.");
        }

        console.log(`Viagem existente --> ${viagemSolicitada}`)

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

    console.log(`Não há conflitos!!`)

    if (conflitos.length > 0) {
        throw new Error("O usuário já possui uma solicitação ou participação em uma viagem com conflito de datas.");
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
            return null;
        }

        // Inverte o status: se for 1 vira 0, se for 0 vira 1
        solicitacao.status = solicitacao.status === 1 ? 0 : 1;
        solicitacao.dataAtualizacao = new Date(); // Atualiza a data de modificação
        await solicitacao.save();

        return solicitacao;
    }
}
