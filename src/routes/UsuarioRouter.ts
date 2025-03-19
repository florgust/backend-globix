import { Router } from 'express';
import { getUsuarios } from '../controllers/UsuarioController';

const router = Router();

router.get('/usuarios', getUsuarios);

export default router;
