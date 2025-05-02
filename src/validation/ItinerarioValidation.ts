import { z } from 'zod';

export const itinerarioSchema = z.object({
    viagemId: z.number().int().positive({ message: 'O campo "viagemId" deve ser um número inteiro positivo.' }),
    tipoEvento: z.string()
        .min(3, { message: 'O campo "tipoEvento" deve ter pelo menos 3 caracteres.' })
        .max(128, { message: 'O campo "tipoEvento" deve ter no máximo 128 caracteres.' }),
    titulo: z.string()
        .min(3, { message: 'O campo "titulo" deve ter pelo menos 3 caracteres.' })
        .max(256, { message: 'O campo "titulo" deve ter no máximo 256 caracteres.' }),
    dataHora: z.preprocess((value) => new Date(value as string), z.date({ invalid_type_error: 'O campo "dataHora" deve ser uma data válida.' })),
    descricao: z.string()
        .max(500, { message: 'O campo "descricao" deve ter no máximo 500 caracteres.' })
        .optional(),
});

export const itinerarioUpdateSchema = itinerarioSchema.partial();