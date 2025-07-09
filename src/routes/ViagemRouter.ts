import express from 'express';
import {
    getViagens,
    getViagemById,
    getViagemByCodigoConvite,
    createViagem,
    updateViagem,
    deleteViagem,
    getViagensComFoto,
    getViagemComFotoById,
    getViagemComFotoByCodigoConvite
} from '@controllers/ViagemController';

const router = express.Router();

router.get('/viagens', getViagens);
router.get('/viagem/:id', getViagemById);
router.get('/viagem/codigo/:codigoConvite', getViagemByCodigoConvite);
router.post('/viagem', createViagem);
router.put('/viagem/:id', updateViagem);
router.delete('/viagem/:id', deleteViagem);

// NOVAS ROTAS para buscar com foto
router.get('/viagens/fotos', getViagensComFoto);
router.get('/viagens/:id/foto', getViagemComFotoById);
router.get('/viagens/codigo/:codigoConvite/foto', getViagemComFotoByCodigoConvite);


export default router;