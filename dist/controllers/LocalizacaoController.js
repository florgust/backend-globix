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
exports.deleteLocalizacao = exports.updateLocalizacao = exports.createLocalizacao = exports.getLocalizacaoById = exports.getLocalizacoes = void 0;
const LocalizacaoService_1 = require("@services/LocalizacaoService");
const LocalizacaoValidation_1 = require("@validation/LocalizacaoValidation");
const AsyncHandler_1 = require("@middlewares/AsyncHandler");
// Buscar todas as localizações
exports.getLocalizacoes = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const localizacoes = yield LocalizacaoService_1.LocalizacaoService.getLocalizacoes();
    res.status(200).send(localizacoes);
}));
// Buscar localização por ID
exports.getLocalizacaoById = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const localizacao = yield LocalizacaoService_1.LocalizacaoService.getLocalizacaoById(Number(id));
    res.status(200).json(localizacao);
}));
// Criar uma nova localização
exports.createLocalizacao = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = LocalizacaoValidation_1.localizacaoSchema.parse(req.body);
    const novaLocalizacao = yield LocalizacaoService_1.LocalizacaoService.createLocalizacao(parsedData);
    res.status(201).json(novaLocalizacao);
}));
// Atualizar localização
exports.updateLocalizacao = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const localizacaoAtualizada = yield LocalizacaoService_1.LocalizacaoService.updateLocalizacao(Number(id), data);
    res.json(localizacaoAtualizada);
}));
// Deletar localização
exports.deleteLocalizacao = (0, AsyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield LocalizacaoService_1.LocalizacaoService.deleteLocalizacao(Number(id));
    res.json({ message: 'Localização deletada com sucesso.' });
}));
