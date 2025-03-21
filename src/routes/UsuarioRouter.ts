import { Router } from 'express';
import { getUsuarios, getUsuarioById } from '../controllers/UsuarioController';

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);

export default router;
