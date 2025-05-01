"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("@controllers/UsuarioController");
const router = express_1.default.Router();
// Rotas para Usuários
router.get('/usuarios', UsuarioController_1.getUsuarios); // Buscar todos os usuários
router.get('/usuario/:id', UsuarioController_1.getUsuarioById); // Buscar um usuário por ID
router.post('/usuario', UsuarioController_1.createUsuario); // Criar um novo usuário
router.put('/usuario/:id', UsuarioController_1.updateUsuario); // Atualizar um usuário existente
router.put('/usuario/:id/delete', UsuarioController_1.deleteUsuario); // Alterar o status de um usuário para 0 (desativar)
exports.default = router;
//# sourceMappingURL=UsuarioRouter.js.map