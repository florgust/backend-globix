import express from 'express';
import {
    getSolicitacoesPorUsuario,
    getSolicitacoesPorViagem,
    criarSolicitacao,
    atualizarStatusSolicitacao
} from '../controllers/api/SolicitacaoController';

const router = express.Router();

// Rotas para Solicitações
router.get('/solicitacoes/usuario/:idUsuario', getSolicitacoesPorUsuario); // Buscar todas as solicitações de um usuário
router.get('/solicitacoes/viagem/:idViagem', getSolicitacoesPorViagem); // Buscar todas as solicitações de uma viagem
router.post('/solicitacao/:idUsuario/:idViagem', criarSolicitacao); // Criar uma nova solicitação de viagem
router.put('/solicitacao/:idViagem/:idUsuario/status', atualizarStatusSolicitacao); // Atualizar o status de uma solicitação

export default router;
