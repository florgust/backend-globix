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
router.get('/usuario/:id', getUsuarioById); // Buscar um usuário por ID
router.post('/usuario', createUsuario); // Criar um novo usuário
router.put('/usuario/:id', updateUsuario); // Atualizar um usuário existente
router.put('/usuario/:id/delete', deleteUsuario); // Alterar o status de um usuário para 0 (desativar)

export default router;