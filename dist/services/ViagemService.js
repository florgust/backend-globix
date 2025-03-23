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
exports.ViagemService = void 0;
const Viagem_1 = __importDefault(require("../model/Viagem"));
class ViagemService {
    //Buscar todas as viagens
    static getViagens() {
        return __awaiter(this, void 0, void 0, function* () {
            return Viagem_1.default.findAll();
        });
    }
    //Buscar viagem por ID
    static getViagemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Viagem_1.default.findByPk(id);
        });
    }
    //Criar nova viagem com validação
    static createViagem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Criar a viagem no banco de dados com dataCriacao e dataAtualizacao
            const codigoConvite = yield this.createCodigoConvite(); // Chama o método de instância
            return yield Viagem_1.default.create(Object.assign(Object.assign({}, data), { codigoConvite: codigoConvite, status: 1, dataCriacao: new Date(), dataAtualizacao: new Date() // Configura a data de atualização
             }));
        });
    }
    static createCodigoConvite() {
        return __awaiter(this, void 0, void 0, function* () {
            let codigoConvite;
            let codigoExiste;
            do {
                // Gerar um novo código de convite
                codigoConvite = Math.floor(100000 + Math.random() * 900000);
                // Verificar se o código de convite já existe na tabela
                codigoExiste = yield Viagem_1.default.findOne({
                    where: { codigoConvite },
                });
            } while (codigoExiste); // Repetir até encontrar um código único
            return codigoConvite;
        });
    }
    //Atualizar viagem
    static updateViagem(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Verificar se a viagem existe
            const viagem = yield Viagem_1.default.findByPk(id);
            if (!viagem) {
                throw new Error('Viagem não encontrada');
            }
            viagem.dataAtualizacao = new Date();
            // Atualizar os campos fornecidos
            return yield viagem.update(Object.assign(Object.assign({}, data), { dataAtualizacao: new Date() }));
        });
    }
    //Deletar viagem
    static deleteViagem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const viagem = yield Viagem_1.default.findByPk(id);
            if (!viagem) {
                return false;
            }
            yield viagem.destroy();
            return true;
        });
    }
}
exports.ViagemService = ViagemService;
