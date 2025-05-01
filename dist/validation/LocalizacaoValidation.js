"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizacaoSchema = void 0;
const zod_1 = require("zod");
exports.localizacaoSchema = zod_1.z.object({
    idViagem: zod_1.z.number().int().positive({ message: 'O campo "idViagem" deve ser um número inteiro positivo.' }),
    nome: zod_1.z.string().min(3, { message: 'O campo "nome" deve ter pelo menos 3 caracteres.' }).max(100, { message: 'O campo "nome" deve ter no máximo 100 caracteres.' }),
    idaEnderecoPartida: zod_1.z.string().min(5, { message: 'O campo "idaEnderecoPartida" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "idaEnderecoPartida" deve ter no máximo 255 caracteres.' }),
    idaEnderecoChegada: zod_1.z.string().min(5, { message: 'O campo "idaEnderecoChegada" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "idaEnderecoChegada" deve ter no máximo 255 caracteres.' }),
    idaDataPartida: zod_1.z.preprocess((value) => new Date(value), zod_1.z.date({ invalid_type_error: 'O campo "idaDataPartida" deve ser uma data válida.' })),
    idaDataChegada: zod_1.z.preprocess((value) => new Date(value), zod_1.z.date({ invalid_type_error: 'O campo "idaDataChegada" deve ser uma data válida.' })),
    voltaEnderecoPartida: zod_1.z.string().min(5, { message: 'O campo "voltaEnderecoPartida" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "voltaEnderecoPartida" deve ter no máximo 255 caracteres.' }),
    voltaEnderecoChegada: zod_1.z.string().min(5, { message: 'O campo "voltaEnderecoChegada" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "voltaEnderecoChegada" deve ter no máximo 255 caracteres.' }),
    voltaDataPartida: zod_1.z.preprocess((value) => new Date(value), zod_1.z.date({ invalid_type_error: 'O campo "voltaDataPartida" deve ser uma data válida.' })),
    voltaDataChegada: zod_1.z.preprocess((value) => new Date(value), zod_1.z.date({ invalid_type_error: 'O campo "voltaDataChegada" deve ser uma data válida.' })),
});
//# sourceMappingURL=LocalizacaoValidation.js.map