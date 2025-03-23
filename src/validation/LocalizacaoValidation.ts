import { z } from 'zod';

export const localizacaoSchema = z.object({
    idViagem: z.number().int().positive({ message: 'O campo "idViagem" deve ser um número inteiro positivo.' }),
    nome: z.string().min(3, { message: 'O campo "nome" deve ter pelo menos 3 caracteres.' }).max(100, { message: 'O campo "nome" deve ter no máximo 100 caracteres.' }),
    enderecoPartida: z.string().min(5, { message: 'O campo "enderecoPartida" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "enderecoPartida" deve ter no máximo 255 caracteres.' }),
    enderecoChegada: z.string().min(5, { message: 'O campo "enderecoChegada" deve ter pelo menos 5 caracteres.' }).max(255, { message: 'O campo "enderecoChegada" deve ter no máximo 255 caracteres.' }),
    dataPartida: z.preprocess((value) => new Date(value as string), z.date({ invalid_type_error: 'O campo "dataPartida" deve ser uma data válida.' })),
    dataChegada: z.preprocess((value) => new Date(value as string), z.date({ invalid_type_error: 'O campo "dataChegada" deve ser uma data válida.' })),
});