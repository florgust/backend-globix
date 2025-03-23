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
const LocalizacaoService_1 = require("../services/LocalizacaoService");
const LocalizacaoValidation_1 = require("../validation/LocalizacaoValidation");
// Buscar todas as localizações
const getLocalizacoes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const localizacoes = yield LocalizacaoService_1.LocalizacaoService.getLocalizacoes();
        res.status(200).send(localizacoes);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar localizações' });
    }
});
exports.getLocalizacoes = getLocalizacoes;
// Buscar localização por ID
const getLocalizacaoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const localizacao = yield LocalizacaoService_1.LocalizacaoService.getLocalizacaoById(Number(id));
        if (!localizacao) {
            res.status(404).json({ error: 'Localização não encontrada' });
        }
        res.status(200).json(localizacao);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar a localização' });
    }
});
exports.getLocalizacaoById = getLocalizacaoById;
// Criar uma nova localização
const createLocalizacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedData = LocalizacaoValidation_1.localizacaoSchema.parse(req.body);
        const novaLocalizacao = yield LocalizacaoService_1.LocalizacaoService.createLocalizacao(parsedData);
        res.status(201).json(novaLocalizacao);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createLocalizacao = createLocalizacao;
// Atualizar localização
const updateLocalizacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        // Chama o serviço para atualizar a localização
        const localizacaoAtualizada = yield LocalizacaoService_1.LocalizacaoService.updateLocalizacao(Number(id), data);
        res.json(localizacaoAtualizada);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateLocalizacao = updateLocalizacao;
// Deletar localização
const deleteLocalizacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const localizacao = yield LocalizacaoService_1.LocalizacaoService.deleteLocalização(Number(id));
        if (!localizacao) {
            res.status(404).json({ error: 'Localização não encontrada' });
        }
        res.json({ message: 'Localização deletada com sucesso.' });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a localização' });
    }
});
exports.deleteLocalizacao = deleteLocalizacao;
