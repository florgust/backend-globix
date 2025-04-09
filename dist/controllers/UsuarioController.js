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
const UsuarioValidation_1 = require("../validation/UsuarioValidation");
const zod_1 = require("zod");
// Buscar todos os usuários
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET /usuarios - Iniciando busca de todos os usuários');
    try {
        const usuarios = yield UsuarioService_1.UsuarioService.getUsuarios();
        console.log('GET /usuarios - Usuários encontrados:', usuarios);
        res.json(usuarios);
    }
    catch (error) {
        console.error('GET /usuarios - Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});
exports.getUsuarios = getUsuarios;
// Buscar usuário por ID
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`GET /usuarios/${id} - Iniciando busca do usuário com ID ${id}`);
    try {
        const usuario = yield UsuarioService_1.UsuarioService.getUsuarioById(Number(id));
        if (!usuario) {
            console.warn(`GET /usuarios/${id} - Usuário não encontrado`);
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        console.log(`GET /usuarios/${id} - Usuário encontrado:`, usuario);
        res.json(usuario);
    }
    catch (error) {
        console.error(`GET /usuarios/${id} - Erro ao buscar usuário:`, error);
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
});
exports.getUsuarioById = getUsuarioById;
// Criar um novo usuário
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST /usuarios - Dados recebidos para criação:', req.body);
    try {
        const validetData = UsuarioValidation_1.usuarioSchema.parse(req.body);
        const novoUsuario = yield UsuarioService_1.UsuarioService.createUsuario(validetData);
        console.log('POST /usuarios - Usuário criado com sucesso:', novoUsuario);
        res.status(201).json(novoUsuario);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            console.warn('POST /usuarios - Erros de validação:', error.errors);
            res.status(400).send(error.errors); // Retorna os erros de validação
        }
        else {
            console.error('POST /usuarios - Erro ao criar usuário:', error);
            res.status(400).json({ error: error.message });
        }
    }
});
exports.createUsuario = createUsuario;
// Atualizar usuário
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`PUT /usuarios/${id} - Dados recebidos para atualização:`, req.body);
    try {
        const data = req.body;
        // Chama o serviço para atualizar o usuário
        const usuarioAtualizado = yield UsuarioService_1.UsuarioService.updateUsuario(Number(id), data);
        console.log(`PUT /usuarios/${id} - Usuário atualizado com sucesso:`, usuarioAtualizado);
        res.json(usuarioAtualizado);
    }
    catch (error) {
        console.error(`PUT /usuarios/${id} - Erro ao atualizar usuário:`, error);
        res.status(400).json({ error: error.message });
    }
});
exports.updateUsuario = updateUsuario;
// Deletar usuário (alterar status para 0)
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`DELETE /usuarios/${id} - Iniciando exclusão lógica do usuário com ID ${id}`);
    try {
        const usuario = yield UsuarioService_1.UsuarioService.deleteUsuario(Number(id));
        if (!usuario) {
            console.warn(`DELETE /usuarios/${id} - Usuário não encontrado`);
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        console.log(`DELETE /usuarios/${id} - Usuário desativado com sucesso`);
        res.json({ message: 'Usuário desativado com sucesso.' });
    }
    catch (error) {
        console.error(`DELETE /usuarios/${id} - Erro ao desativar usuário:`, error);
        res.status(500).json({ error: 'Erro ao desativar o usuário' });
    }
});
exports.deleteUsuario = deleteUsuario;
