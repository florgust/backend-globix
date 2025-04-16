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
const zod_1 = require("zod");
const getViagens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET /viagens - Iniciando busca de todas as viagens');
    try {
        const viagens = yield ViagemService_1.ViagemService.getViagens();
        console.log('GET /viagens - Viagens encontradas:', viagens);
        res.status(200).send(viagens);
    }
    catch (error) {
        console.error('GET /viagens - Erro ao buscar viagens:', error);
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
});
exports.getViagens = getViagens;
const getViagemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log(`GET /viagens/${id} - Iniciando busca da viagem com ID ${id}`);
    try {
        const viagem = yield ViagemService_1.ViagemService.getViagemById(id);
        if (!viagem) {
            console.warn(`GET /viagens/${id} - Viagem não encontrada`);
            res.status(404).send('Viagem não encontrada');
        }
        else {
            console.log(`GET /viagens/${id} - Viagem encontrada:`, viagem);
            res.status(200).send(viagem);
        }
    }
    catch (error) {
        console.error(`GET /viagens/${id} - Erro ao buscar viagem:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
});
exports.getViagemById = getViagemById;
const createViagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST /viagens - Dados recebidos para criação:', req.body);
    try {
        const validatedData = ViagemValidation_1.createViagemSchema.parse(req.body);
        const viagem = yield ViagemService_1.ViagemService.createViagem(validatedData);
        console.log('POST /viagens - Viagem criada com sucesso:', viagem);
        res.status(201).send(viagem);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            console.warn('POST /viagens - Erros de validação:', error.errors);
            res.status(400).send(error.errors); // Retorna os erros de validação
        }
        else {
            console.error('POST /viagens - Erro ao criar viagem:', error);
            const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
            res.status(500).send(errorMessage);
        }
    }
});
exports.createViagem = createViagem;
const updateViagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log(`PUT /viagens/${id} - Dados recebidos para atualização:`, req.body);
    try {
        const data = req.body;
        const viagem = yield ViagemService_1.ViagemService.updateViagem(id, data);
        if (!viagem) {
            console.warn(`PUT /viagens/${id} - Viagem não encontrada`);
            res.status(404).send('Viagem não encontrada');
        }
        else {
            console.log(`PUT /viagens/${id} - Viagem atualizada com sucesso:`, viagem);
            res.status(200).send(viagem);
        }
    }
    catch (error) {
        console.error(`PUT /viagens/${id} - Erro ao atualizar viagem:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
});
exports.updateViagem = updateViagem;
const deleteViagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log(`DELETE /viagens/${id} - Iniciando exclusão da viagem com ID ${id}`);
    try {
        const viagem = yield ViagemService_1.ViagemService.deleteViagem(id);
        if (!viagem) {
            console.warn(`DELETE /viagens/${id} - Viagem não encontrada`);
            res.status(404).send('Viagem não encontrada');
        }
        else {
            console.log(`DELETE /viagens/${id} - Viagem deletada com sucesso`);
            res.status(200).send('Viagem deletada com sucesso');
        }
    }
    catch (error) {
        console.error(`DELETE /viagens/${id} - Erro ao deletar viagem:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
});
exports.deleteViagem = deleteViagem;
