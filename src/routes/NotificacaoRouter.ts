import express from 'express';
import {
  getUnreadNotificacoes,
  markReadNotificacoes
} from '@controllers/api/notificacoes/NotificacaoController'

const router = express.Router();

// GET  /notificacoes/unread/:userId    → retorna só as não-lidas
router.get('/notificacoes/unread/:userId', getUnreadNotificacoes);

// PUT  /notificacoes/mark-read         → body { ids: number[] }
router.put('/notificacoes/mark-read', markReadNotificacoes);

export default router;