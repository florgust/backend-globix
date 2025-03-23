import { Router } from 'express';
import { getViagens, getViagemById, createViagem, updateViagem, deleteViagem} from '../controllers/ViagemController';

const router = Router();

router.get('/viagens', getViagens);
router.get('/viagem/:id', getViagemById);
router.post('/viagem', createViagem);
router.put('/viagem/:id', updateViagem);
router.delete('/viagem/:id', deleteViagem);

export default router;