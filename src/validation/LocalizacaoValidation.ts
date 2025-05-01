import { z } from 'zod';

export const localizacaoSchema = z.object({
    idViagem: z.number().int().positive({ message: 'O campo "idViagem" deve ser um número inteiro positivo.' }),
    nome: z.string().min(3, { message: 'O campo "nome" deve ter pelo menos 3 caracteres.' }).max(100, { message: 'O campo "nome" deve ter no máximo 100 caracteres.' }),
    idaEnderecoPartida: z.string().min(5, { message: 'O campo "idaEnderecoPartida" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "idaEnderecoPartida" deve ter no máximo 255 caracteres.' }),
    idaEnderecoChegada: z.string().min(5, { message: 'O campo "idaEnderecoChegada" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "idaEnderecoChegada" deve ter no máximo 255 caracteres.' }),
    idaDataPartida: z.preprocess((value) => new Date(value as string), z.date({ invalid_type_error: 'O campo "idaDataPartida" deve ser uma data válida.' })),
    idaDataChegada: z.preprocess((value) => new Date(value as string), z.date({ invalid_type_error: 'O campo "idaDataChegada" deve ser uma data válida.' })),
    voltaEnderecoPartida: z.string().min(5, { message: 'O campo "voltaEnderecoPartida" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "voltaEnderecoPartida" deve ter no máximo 255 caracteres.' }),
    voltaEnderecoChegada: z.string().min(5, { message: 'O campo "voltaEnderecoChegada" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "voltaEnderecoChegada" deve ter no máximo 255 caracteres.' }),
    voltaDataPartida: z.preprocess((value) => new Date(value as string), z.date({ invalid_type_error: 'O campo "voltaDataPartida" deve ser uma data válida.' })),
    voltaDataChegada: z.preprocess((value) => new Date(value as string), z.date({ invalid_type_error: 'O campo "voltaDataChegada" deve ser uma data válida.' })),
});