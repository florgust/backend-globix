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
// Buscar todas as localizações
const getLocalizacoes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET /localizacoes - Iniciando busca de todas as localizações');
    try {
        const localizacoes = yield LocalizacaoService_1.LocalizacaoService.getLocalizacoes();
        console.log('GET /localizacoes - Localizações encontradas:', localizacoes);
        res.status(200).send(localizacoes);
    }
    catch (error) {
        console.error('GET /localizacoes - Erro ao buscar localizações:', error);
        res.status(500).json({ error: 'Erro ao buscar localizações' });
    }
});
exports.getLocalizacoes = getLocalizacoes;
// Buscar localização por ID
const getLocalizacaoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`GET /localizacoes/${id} - Iniciando busca da localização com ID ${id}`);
    try {
        const localizacao = yield LocalizacaoService_1.LocalizacaoService.getLocalizacaoById(Number(id));
        if (!localizacao) {
            console.warn(`GET /localizacoes/${id} - Localização não encontrada`);
            res.status(404).json({ error: 'Localização não encontrada' });
            return;
        }
        console.log(`GET /localizacoes/${id} - Localização encontrada:`, localizacao);
        res.status(200).json(localizacao);
    }
    catch (error) {
        console.error(`GET /localizacoes/${id} - Erro ao buscar localização:`, error);
        res.status(500).json({ error: 'Erro ao buscar a localização' });
    }
});
exports.getLocalizacaoById = getLocalizacaoById;
// Criar uma nova localização
const createLocalizacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST /localizacoes - Dados recebidos para criação:', req.body);
    try {
        const parsedData = LocalizacaoValidation_1.localizacaoSchema.parse(req.body);
        const novaLocalizacao = yield LocalizacaoService_1.LocalizacaoService.createLocalizacao(parsedData);
        console.log('POST /localizacoes - Localização criada com sucesso:', novaLocalizacao);
        res.status(201).json(novaLocalizacao);
    }
    catch (error) {
        console.error('POST /localizacoes - Erro ao criar localização:', error);
        res.status(400).json({ error: error.message });
    }
});
exports.createLocalizacao = createLocalizacao;
// Atualizar localização
const updateLocalizacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`PUT /localizacoes/${id} - Dados recebidos para atualização:`, req.body);
    try {
        const data = req.body;
        const localizacaoAtualizada = yield LocalizacaoService_1.LocalizacaoService.updateLocalizacao(Number(id), data);
        console.log(`PUT /localizacoes/${id} - Localização atualizada com sucesso:`, localizacaoAtualizada);
        res.json(localizacaoAtualizada);
    }
    catch (error) {
        console.error(`PUT /localizacoes/${id} - Erro ao atualizar localização:`, error);
        res.status(400).json({ error: error.message });
    }
});
exports.updateLocalizacao = updateLocalizacao;
// Deletar localização
const deleteLocalizacao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`DELETE /localizacoes/${id} - Iniciando exclusão da localização com ID ${id}`);
    try {
        const localizacao = yield LocalizacaoService_1.LocalizacaoService.deleteLocalização(Number(id));
        if (!localizacao) {
            console.warn(`DELETE /localizacoes/${id} - Localização não encontrada`);
            res.status(404).json({ error: 'Localização não encontrada' });
            return;
        }
        console.log(`DELETE /localizacoes/${id} - Localização deletada com sucesso`);
        res.json({ message: 'Localização deletada com sucesso.' });
    }
    catch (error) {
        console.error(`DELETE /localizacoes/${id} - Erro ao deletar localização:`, error);
        res.status(500).json({ error: 'Erro ao deletar a localização' });
    }
});
exports.deleteLocalizacao = deleteLocalizacao;
