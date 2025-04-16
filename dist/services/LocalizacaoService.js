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
exports.LocalizacaoService = void 0;
const Localizacao_1 = __importDefault(require("@models/Localizacao"));
const Errors_1 = require("@utils/Errors");
class LocalizacaoService {
    // Buscar todas as localizações
    static getLocalizacoes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Localizacao_1.default.findAll();
        });
    }
    // Buscar Localização por ID
    static getLocalizacaoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const localizacao = yield Localizacao_1.default.findByPk(id);
            if (!localizacao) {
                throw new Errors_1.NotFoundError("Localização não encontrada.");
            }
            return localizacao;
        });
    }
    // Criar nova localização com validação
    static createLocalizacao(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nome) {
                throw new Errors_1.BadRequestError("O campo 'nome' é obrigatório.");
            }
            return yield Localizacao_1.default.create(Object.assign(Object.assign({}, data), { dataCriacao: new Date(), dataAtualizacao: new Date() }));
        });
    }
    // Atualizar uma localização existente
    static updateLocalizacao(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const localizacao = yield Localizacao_1.default.findByPk(id);
            if (!localizacao) {
                throw new Errors_1.NotFoundError("Localização não encontrada.");
            }
            return yield localizacao.update(Object.assign(Object.assign({}, data), { dataAtualizacao: new Date() }));
        });
    }
    // Deletar localização
    static deleteLocalizacao(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const localizacao = yield Localizacao_1.default.findByPk(id);
            if (!localizacao) {
                throw new Errors_1.NotFoundError("Localização não encontrada.");
            }
            yield localizacao.destroy();
            return { message: "Localização deletada com sucesso!" };
        });
    }
}
exports.LocalizacaoService = LocalizacaoService;
