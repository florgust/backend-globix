"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizacaoSchema = void 0;
const zod_1 = require("zod");
exports.localizacaoSchema = zod_1.z.object({
    idViagem: zod_1.z.number().int().positive({ message: 'O campo "idViagem" deve ser um número inteiro positivo.' }),
    nome: zod_1.z.string().min(3, { message: 'O campo "nome" deve ter pelo menos 3 caracteres.' }).max(100, { message: 'O campo "nome" deve ter no máximo 100 caracteres.' }),
    enderecoPartida: zod_1.z.string().min(5, { message: 'O campo "enderecoPartida" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "enderecoPartida" deve ter no máximo 255 caracteres.' }),
    enderecoChegada: zod_1.z.string().min(5, { message: 'O campo "enderecoChegada" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "enderecoChegada" deve ter no máximo 255 caracteres.' }),
    dataPartida: zod_1.z.preprocess((value) => new Date(value), zod_1.z.date({ invalid_type_error: 'O campo "dataPartida" deve ser uma data válida.' })),
    dataChegada: zod_1.z.preprocess((value) => new Date(value), zod_1.z.date({ invalid_type_error: 'O campo "dataChegada" deve ser uma data válida.' })),
});
