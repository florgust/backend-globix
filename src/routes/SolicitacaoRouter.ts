import express from 'express';
import {
    getSolicitacoesPorUsuario,
    getSolicitacoesPorViagem,
    getSolicitacoesViagemToCard,
    criarSolicitacao,
    criarSolicitacaoCriadorViagem,
    atualizarStatusSolicitacao,
    promoverOuDespromoverOrganizadorSolicitacao,
    encerrarViagem
} from '@controllers/api/solicitacao/SolicitacaoController';

const router = express.Router();

// Rotas para Solicitações
router.get('/solicitacoes/usuario/:idUsuario', getSolicitacoesPorUsuario); // Buscar todas as solicitações de um usuário
router.get('/solicitacoes/viagem/:idViagem', getSolicitacoesPorViagem); // Buscar todas as solicitações de uma viagem
router.get('/solicitacoes/viagem/card/:idUsuario', getSolicitacoesViagemToCard); // Buscar todas as solicitações de uma viagem para o card
router.post('/solicitacao/:idUsuario/:idViagem', criarSolicitacao); // Criar uma nova solicitação de viagem
router.post('/solicitacao/criador/:idUsuario/:idViagem', criarSolicitacaoCriadorViagem); // Criar uma solicitação como criador da viagem
router.post('/solicitacao/promocao/:idViagem/:idUsuarioOrganizador', promoverOuDespromoverOrganizadorSolicitacao); // Promover ou despromover um organizador de viagem
router.put('/solicitacao/:idViagem/:idUsuario/status', atualizarStatusSolicitacao); // Atualizar o status de uma solicitação
router.put('/solicitacao/encerrar/:idViagem', encerrarViagem); // Encerrar viagem - inativar todas as solicitações

export default router;