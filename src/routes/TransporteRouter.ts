import express from 'express';
import {
    getTransportes,
    getTransporteById,
    getTransporteByIdViagem,
    createTransporte,
    updateTransporte,
    deleteTransporte
} from '@controllers/TransporteController';

const router = express.Router();

// Rotas para Transportes
router.get('/transportes', getTransportes); // Buscar todos os transportes
router.get('/transporte/:id', getTransporteById); // Buscar transporte por ID
router.get('/transporte/viagem/:viagemId', getTransporteByIdViagem); // Buscar transporte por ID da Viagem
router.post('/transporte', createTransporte); // Criar um novo transporte
router.put('/transporte/:id', updateTransporte); // Atualizar um transporte existente
router.delete('/transporte/:id', deleteTransporte); // Deletar um transporte

export default router;