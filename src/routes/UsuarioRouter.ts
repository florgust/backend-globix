import express from 'express';
import {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from '../controllers/UsuarioController';

const router = express.Router();

// Rotas para Usuários
router.get('/usuarios', getUsuarios); // Buscar todos os usuários
router.get('/usuarios/:id', getUsuarioById); // Buscar um usuário por ID
router.post('/usuarios', createUsuario); // Criar um novo usuário
router.put('/usuarios/:id', updateUsuario); // Atualizar um usuário existente
router.put('/usuarios/:id/delete', deleteUsuario); // Alterar o status de um usuário para 0 (desativar)

export default router;