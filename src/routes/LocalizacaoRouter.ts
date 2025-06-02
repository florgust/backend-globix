import express from 'express';
import {
    getLocalizacoes,
    getLocalizacaoById,
    getLocalizacaoByIdViagem,
    createLocalizacao,
    updateLocalizacao,
    deleteLocalizacao
} from '@controllers/LocalizacaoController';

const router = express.Router();

// Rotas para Localizações
router.get('/localizacoes', getLocalizacoes); // Buscar todas as localizações
router.get('/localizacao/:id', getLocalizacaoById); // Buscar localização por ID
router.get('/localizacao/viagem/:idViagem', getLocalizacaoByIdViagem); // Buscar localização por ID da viagem
router.post('/localizacao', createLocalizacao); // Criar uma nova localização
router.put('/localizacao/:id', updateLocalizacao); // Atualizar uma localização existente
router.delete('/localizacao/:id', deleteLocalizacao); // Deletar uma localização

export default router;