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
}