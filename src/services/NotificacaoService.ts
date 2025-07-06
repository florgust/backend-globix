import Notificacao from '@models/Notificacoes';

export class NotificacaoService {
    // 1️⃣ Buscar notificações não lidas de um usuário
    static async getUnreadByUser(userId: number) {
        return await Notificacao.findAll({
            where: { userId, read: false },
            order: [['dataCriacao', 'DESC']],
        });
    }

    // 2️⃣ Marcar notificações como lidas recebendo uma lista de ids
    static async markRead(ids: number[]) {
        return await Notificacao.update(
            { read: true },
            { where: { id: ids } }
        );
    }

    // 3️⃣ Buscar as 3 últimas notificações (lidas ou não)
    static async getLastThreeByUser(userId: number) {
        return await Notificacao.findAll({
            where: { userId },
            order: [['dataCriacao', 'DESC']],
            limit: 3,
        });
    }
}