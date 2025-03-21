import { Router } from 'express';
import { getUsuarios, getUsuarioById, createUsuario } from '../controllers/UsuarioController';

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);
router.post('/usuarios', createUsuario);

export default router;
