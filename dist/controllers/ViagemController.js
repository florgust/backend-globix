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
const ViagemService_1 = require("../services/ViagemService");
const ViagemValidation_1 = require("../validation/ViagemValidation");
const zod_1 = require("zod");
const getViagens = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const viagens = yield ViagemService_1.ViagemService.getViagens();
        res.status(200).send(viagens);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
});
exports.getViagens = getViagens;
const getViagemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const viagem = yield ViagemService_1.ViagemService.getViagemById(id);
        if (!viagem) {
            res.status(404).send('Viagem não encontrada');
        }
        else {
            res.status(200).send(viagem);
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
});
exports.getViagemById = getViagemById;
const createViagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validação dos dados de entrada
        const validatedData = ViagemValidation_1.createViagemSchema.parse(req.body);
        const viagem = yield ViagemService_1.ViagemService.createViagem(validatedData);
        res.status(201).send(viagem);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).send(error.errors); // Retorna os erros de validação
        }
        else {
            const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
            res.status(500).send(errorMessage);
        }
    }
});
exports.createViagem = createViagem;
const updateViagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const viagem = yield ViagemService_1.ViagemService.updateViagem(id, data);
        if (!viagem) {
            res.status(404).send('Viagem não encontrada');
        }
        else {
            res.status(200).send(viagem);
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
});
exports.updateViagem = updateViagem;
const deleteViagem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const viagem = yield ViagemService_1.ViagemService.deleteViagem(id);
        if (!viagem) {
            res.status(404).send('Viagem não encontrada');
        }
        else {
            res.status(200).send('Viagem deletada com sucesso');
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
});
exports.deleteViagem = deleteViagem;
