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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = __importDefault(require("@models/Usuario"));
const PasswordUtils_1 = require("@utils/PasswordUtils");
const Errors_1 = require("@utils/Errors");
class UsuarioService {
    // Buscar todos os usuários ativos (status = 1)
    static getUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Usuario_1.default.findAll({
                where: {
                    status: 1,
                },
            });
        });
    }
    // Buscar usuário por ID
    static getUsuarioById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield Usuario_1.default.findByPk(id);
            if (!usuario) {
                throw new Errors_1.NotFoundError('Usuário não encontrado.');
            }
            return usuario;
        });
    }
    // Criar novo usuário
    static createUsuario(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar se o email já existe
            const usuarioExistente = yield Usuario_1.default.findOne({ where: { email: data.email } });
            if (usuarioExistente) {
                throw new Errors_1.BadRequestError('O email já está em uso.');
            }
            // Hash da senha
            const hashedSenha = yield PasswordUtils_1.PasswordUtils.hashPassword(data.senha);
            data.senha = hashedSenha;
            // Criar o usuário no banco de dados com dataCriacao e dataAtualizacao
            return yield Usuario_1.default.create(Object.assign(Object.assign({}, data), { status: 1, dataCriacao: new Date(), dataAtualizacao: new Date() }));
        });
    }
    // Atualizar usuário
    static updateUsuario(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar se o usuário existe
            const usuario = yield Usuario_1.default.findByPk(id);
            if (!usuario) {
                throw new Errors_1.NotFoundError('Usuário não encontrado.');
            }
            // Se a senha foi fornecida, atualiza a senha
            if (data.senha) {
                data.senha = yield PasswordUtils_1.PasswordUtils.hashPassword(data.senha);
            }
            // Atualizar os campos fornecidos
            return yield usuario.update(Object.assign(Object.assign({}, data), { dataAtualizacao: new Date() }));
        });
    }
    // Deletar usuário (alterar status para 0)
    static deleteUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield Usuario_1.default.findByPk(id);
            if (!usuario) {
                throw new Errors_1.NotFoundError('Usuário não encontrado.');
            }
            // Alterar o status para 0, marcando como desativado
            usuario.status = 0;
            usuario.dataAtualizacao = new Date();
            // Salvar as alterações
            yield usuario.save();
            return usuario;
        });
    }
}
exports.UsuarioService = UsuarioService;
