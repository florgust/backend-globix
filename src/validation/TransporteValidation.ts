import { z } from 'zod';

export const transporteSchema = z.object({
    viagemId: z.number().int().positive({ message: 'O campo "viagemId" deve ser um número inteiro positivo.' }),
    tipoTransporte: z.string()
        .min(3, { message: 'O campo "tipoTransporte" deve ter pelo menos 3 caracteres.' })
        .max(128, { message: 'O campo "tipoTransporte" deve ter no máximo 128 caracteres.' }),
    descricao: z.string()
        .max(500, { message: 'O campo "descricao" deve ter no máximo 500 caracteres.' })
        .optional(),
});

export const transporteUpdateSchema = transporteSchema.partial();