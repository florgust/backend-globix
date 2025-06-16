import express from 'express';
import {
    getOrcamentos,
    getOrcamentoById,
    getOrcamentoByIdViagem,
    createOrcamento,
    updateOrcamento,
    deleteOrcamento
} from '@controllers/OrcamentoController';

const router = express.Router();

// Rotas para Orçamentos
router.get('/orcamentos', getOrcamentos); // Buscar todos os orçamentos
router.get('/orcamento/:id', getOrcamentoById); // Buscar orçamento por ID
router.get('/orcamentos/viagem/:id', getOrcamentoByIdViagem); // Buscar orçamento por ID de viagem
router.post('/orcamento', createOrcamento); // Criar um novo orçamento
router.put('/orcamento/:id', updateOrcamento); // Atualizar um orçamento existente
router.delete('/orcamento/:id', deleteOrcamento); // Deletar um orçamento

export default router;