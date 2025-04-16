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
exports.deleteViagem = exports.updateViagem = exports.createViagem = exports.getViagemById = exports.getViagens = void 0;
const ViagemService_1 = require("@services/ViagemService");
const ViagemValidation_1 = require("@validation/ViagemValidation");
const AsyncHandler_1 = require("@middlewares/AsyncHandler");
// Buscar todas as viagens
exports.getViagens = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET /viagens - Iniciando busca de todas as viagens');
    const viagens = yield ViagemService_1.ViagemService.getViagens();
    console.log('GET /viagens - Viagens encontradas:', viagens);
    res.status(200).send(viagens);
}));
// Buscar viagem por ID
exports.getViagemById = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log(`GET /viagens/${id} - Iniciando busca da viagem com ID ${id}`);
    const viagem = yield ViagemService_1.ViagemService.getViagemById(id);
    console.log(`GET /viagens/${id} - Viagem encontrada:`, viagem);
    res.status(200).send(viagem);
}));
// Criar uma nova viagem
exports.createViagem = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST /viagens - Dados recebidos para criação:', req.body);
    const validatedData = ViagemValidation_1.createViagemSchema.parse(req.body);
    const viagem = yield ViagemService_1.ViagemService.createViagem(validatedData);
    console.log('POST /viagens - Viagem criada com sucesso:', viagem);
    res.status(201).send(viagem);
}));
// Atualizar viagem
exports.updateViagem = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log(`PUT /viagens/${id} - Dados recebidos para atualização:`, req.body);
    const data = req.body;
    const viagem = yield ViagemService_1.ViagemService.updateViagem(id, data);
    console.log(`PUT /viagens/${id} - Viagem atualizada com sucesso:`, viagem);
    res.status(200).send(viagem);
}));
// Deletar viagem
exports.deleteViagem = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log(`DELETE /viagens/${id} - Iniciando exclusão da viagem com ID ${id}`);
    yield ViagemService_1.ViagemService.deleteViagem(id);
    console.log(`DELETE /viagens/${id} - Viagem deletada com sucesso`);
    res.status(200).send('Viagem deletada com sucesso');
}));
