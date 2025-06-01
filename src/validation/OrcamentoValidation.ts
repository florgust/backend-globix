import { z } from 'zod';

export const orcamentoSchema = z.object({
    viagemId: z.number().int().positive({ message: 'O campo "viagemId" deve ser um número inteiro positivo.' }),
    categoria: z.string()
        .min(3, { message: 'O campo "categoria" deve ter pelo menos 3 caracteres.' })
        .max(100, { message: 'O campo "categoria" deve ter no máximo 100 caracteres.' }),
    custo: z.preprocess(
        (value) => typeof value === 'string' ? parseFloat(value) : value,
        z.number({ invalid_type_error: 'O campo "custo" deve ser um número.' })
            .nonnegative({ message: 'O campo "custo" não pode ser negativo.' })
    ),
    observacao: z.string().max(1000, { message: 'O campo "observacao" deve ter no máximo 1000 caracteres.' }).optional().or(z.literal('')),
});