import { Router } from 'express';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario } from '../controllers/UsuarioController';

const router = Router();

router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuarioById);
router.post('/usuarios', createUsuario);
router.put('/usuarios/:id', updateUsuario);  

export default router;
