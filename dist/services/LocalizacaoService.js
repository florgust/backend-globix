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
const Localizacao_1 = __importDefault(require("../model/Localizacao"));
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
            return yield Localizacao_1.default.findByPk(id);
        });
    }
    // Criar nova localização com validação 
    static createLocalizacao(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Localizacao_1.default.create(Object.assign(Object.assign({}, data), { dataCriacao: new Date(), dataAtualizacao: new Date() }));
        });
    }
    // Atualizar uma localização existente
    static updateLocalizacao(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar se a localização existe
            const localizacao = yield Localizacao_1.default.findByPk(id);
            if (!localizacao) {
                throw new Error('Localização não encontrada.');
            }
            // Atualizar os campos fornecidos
            return yield localizacao.update(Object.assign(Object.assign({}, data), { dataAtualizacao: new Date() }));
        });
    }
    // Deletar localização
    static deleteLocalização(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const localizacao = yield Localizacao_1.default.findByPk(id);
            if (!localizacao) {
                throw new Error('Deletar localização --> Localização não encontrada!');
            }
            // Deletar a localização
            yield localizacao.destroy();
            return { message: 'Localização deletada com sucesso!' };
        });
    }
}
exports.LocalizacaoService = LocalizacaoService;
