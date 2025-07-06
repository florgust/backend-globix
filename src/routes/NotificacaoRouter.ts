import express from 'express';
import {
  getUnreadNotificacoes,
  markReadNotificacoes,
  getLastThreeNotificacoes
} from '@controllers/api/notificacoes/NotificacaoController'

const router = express.Router();

// GET  /notificacoes/unread/:userId    → retorna só as não-lidas
router.get('/notificacoes/unread/:userId', getUnreadNotificacoes);

// GET  /notificacoes/last/:userId    → retorna as últimas 3 notificações
router.get('/notificacoes/last/:userId', getLastThreeNotificacoes);

// PUT  /notificacoes/mark-read         → body { ids: number[] }
router.put('/notificacoes/mark-read', markReadNotificacoes);

export default router;