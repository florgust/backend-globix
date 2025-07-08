import { z } from 'zod';

export const createViagemSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório').max(128, 'O nome deve ter no máximo 128 caracteres'),
    descricao: z.string().max(255, 'A descrição deve ter no máximo 255 caracteres').optional(),
    dataInicio: z.preprocess((value) => new Date(value as string), z.date({ invalid_type_error: 'A data início deve ser uma data válida.' })),
    dataFim: z.preprocess((value) => new Date(value as string), z.date({ invalid_type_error: 'A data fim deve ser uma data válida.' })),
    criadorId: z.number().int().positive('O ID do criador deve ser um número inteiro positivo'),
    tipo: z.string().max(50, 'O tipo deve ter no máximo 50 caracteres'),
    quantidadeParticipante: z.number().int().positive('A quantidade de participantes deve ser um número inteiro positivo'),
    cidadeOrigem: z.string().max(250, 'O tipo deve ter no máximo 250 caracteres'),
    cidadeDestino: z.string().max(250, 'O tipo deve ter no máximo 250 caracteres'),
});