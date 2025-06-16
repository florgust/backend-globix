import express from 'express';
import {
    getItinerarios,
    getItinerarioById,
    getItinerarioByIdViagem,
    createItinerario,
    updateItinerario,
    deleteItinerario
} from '@controllers/ItinerarioController';

const router = express.Router();

// Rotas para Itinerários
router.get('/itinerarios', getItinerarios); // Buscar todos os itinerários
router.get('/itinerario/:id', getItinerarioById); // Buscar itinerário por ID
router.get('/itinerarios/viagem/:id', getItinerarioByIdViagem); // Buscar itinerários por ID da Viagem
router.post('/itinerario', createItinerario); // Criar um novo itinerário
router.put('/itinerario/:id', updateItinerario); // Atualizar um itinerário existente
router.delete('/itinerario/:id', deleteItinerario); // Deletar um itinerário

export default router;