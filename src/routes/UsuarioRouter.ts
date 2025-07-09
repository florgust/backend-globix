import express from 'express';
import {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    updateUsuarioSenha,
    deleteUsuario,
    getUsuariosComFoto,
    getUsuarioComFotoById
} from '@controllers/UsuarioController';

const router = express.Router();

// Rotas para Usuários
router.get('/usuarios', getUsuarios); // Buscar todos os usuários
router.get('/usuario/:id', getUsuarioById); // Buscar um usuário por ID
router.post('/usuario', createUsuario); // Criar um novo usuário
router.put('/usuario/:id', updateUsuario); // Atualizar um usuário existente
router.put('/usuario/senha/:id', updateUsuarioSenha); // Atualizar a senha de um usuário
router.put('/usuario/:id/delete', deleteUsuario); // Alterar o status de um usuário para 0 (desativar)

// NOVAS ROTAS para buscar com foto
router.get('/usuarios/fotos', getUsuariosComFoto);
router.get('/usuarios/:id/foto', getUsuarioComFotoById);

export default router;