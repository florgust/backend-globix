"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViagemSchema = void 0;
const zod_1 = require("zod");
exports.createViagemSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, 'O nome é obrigatório').max(128, 'O nome deve ter no máximo 128 caracteres'),
    descricao: zod_1.z.string().max(255, 'A descrição deve ter no máximo 255 caracteres').optional(),
    dataInicio: zod_1.z.preprocess((value) => new Date(value), zod_1.z.date({ invalid_type_error: 'A data início deve ser uma data válida.' })),
    dataFim: zod_1.z.preprocess((value) => new Date(value), zod_1.z.date({ invalid_type_error: 'A data fim deve ser uma data válida.' })),
    criadorId: zod_1.z.number().int().positive('O ID do criador deve ser um número inteiro positivo'),
});
