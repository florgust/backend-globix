import { Request, Response } from 'express';
import { asyncHandler } from '@middlewares/AsyncHandler';
import { NotificacaoService } from '@services/NotificacaoService';

export const getUnreadNotificacoes = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const userId = Number(req.params.userId);
        const notifs = await NotificacaoService.getUnreadByUser(userId);
        res.status(200).json(notifs);
    }
);

export const markReadNotificacoes = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const { ids } = req.body as { ids: number[] };
        if (!Array.isArray(ids) || ids.some(id => typeof id !== 'number')) {
            res.status(400).json({ message: 'Lista de ids inválida.' });
            return;
        }
        await NotificacaoService.markRead(ids);
        res.status(204).send();
    }
);

export const getLastThreeNotificacoes = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const userId = Number(req.params.userId);
        const notifs = await NotificacaoService.getLastThreeByUser(userId);
        res.status(200).json(notifs);
    }
);