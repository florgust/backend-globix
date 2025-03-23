"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = require("../controllers/UsuarioController");
const router = (0, express_1.Router)();
// Rotas para Usuários
router.get('/usuarios', UsuarioController_1.getUsuarios); // Buscar todos os usuários
router.get('/usuarios/:id', UsuarioController_1.getUsuarioById); // Buscar um usuário por ID
router.post('/usuarios', UsuarioController_1.createUsuario); // Criar um novo usuário
router.put('/usuarios/:id', UsuarioController_1.updateUsuario); // Atualizar um usuário existente
router.put('/usuarios/:id/delete', UsuarioController_1.deleteUsuario); // Alterar o status de um usuário para 0 (desativar)
exports.default = router;
