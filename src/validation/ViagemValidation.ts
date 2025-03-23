import { z } from 'zod';

export const createViagemSchema = z.object({
    nome: z.string().min(1, 'O nome é obrigatório').max(128, 'O nome deve ter no máximo 128 caracteres'),
    descricao: z.string().max(255, 'A descrição deve ter no máximo 255 caracteres').optional(),
    dataInicio: z.date().refine((date) => !isNaN(Date.parse(date.toString())), 'Data de início inválida'),
    dataFim: z.date().refine((date) => !isNaN(Date.parse(date.toString())), 'Data de fim inválida'),
    criadorId: z.number().int().positive('O ID do criador deve ser um número inteiro positivo'),
});