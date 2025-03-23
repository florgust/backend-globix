"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.getUsuarioById = exports.getUsuarios = void 0;
const UsuarioService_1 = require("../services/UsuarioService");
// Buscar todos os usuários
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield UsuarioService_1.UsuarioService.getUsuarios();
        return res.json(usuarios);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});
exports.getUsuarios = getUsuarios;
// Buscar usuário por ID
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield UsuarioService_1.UsuarioService.getUsuarioById(Number(id));
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        return res.json(usuario);
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
});
exports.getUsuarioById = getUsuarioById;
// Criar um novo usuário
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const novoUsuario = yield UsuarioService_1.UsuarioService.createUsuario(data);
        return res.status(201).json(novoUsuario);
    }
    catch (error) {
        return res.status(400).json({ error: error.message }); // mensagem de erro extraída do objeto de erro
    }
});
exports.createUsuario = createUsuario;
// Atualizar usuário
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        // Chama o serviço para atualizar o usuário
        const usuarioAtualizado = yield UsuarioService_1.UsuarioService.updateUsuario(Number(id), data);
        return res.json(usuarioAtualizado);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.updateUsuario = updateUsuario;
// Deletar usuário (alterar status para 0)
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield UsuarioService_1.UsuarioService.deleteUsuario(Number(id));
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        return res.json({ message: 'Usuário desativado com sucesso.' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Erro ao desativar o usuário' });
    }
});
exports.deleteUsuario = deleteUsuario;
