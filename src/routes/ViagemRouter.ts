import express from 'express';
import {
    getViagens,
    getViagemById,
    getViagemByCodigoConvite,
    createViagem,
    updateViagem,
    deleteViagem
} from '@controllers/ViagemController';

const router = express.Router();

router.get('/viagens', getViagens);
router.get('/viagem/:id', getViagemById);
router.get('/viagem/codigo/:codigoConvite', getViagemByCodigoConvite);
router.post('/viagem', createViagem);
router.put('/viagem/:id', updateViagem);
router.delete('/viagem/:id', deleteViagem);

export default router;