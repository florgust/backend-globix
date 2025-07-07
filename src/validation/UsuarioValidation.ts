import { z } from 'zod';

export const usuarioSchema = z.object({
    nome: z.string()
        .min(3, { message: 'O campo "nome" deve ter pelo menos 3 caracteres.' })
        .max(100, { message: 'O campo "nome" deve ter no máximo 100 caracteres.' }),

    email: z.string()
        .email({ message: 'O campo "email" deve ser um endereço de e-mail válido.' })
        .max(255, { message: 'O campo "email" deve ter no máximo 255 caracteres.' }),

    senha: z.string()
        .min(8, { message: 'O campo "senha" deve ter pelo menos 8 caracteres.' })
        .max(100, { message: 'O campo "senha" deve ter no máximo 100 caracteres.' }),

    tipo: z.enum(["participante", "organizador"], { message: 'O campo "tipo" deve ser "admin" ou "usuario".' }),
    url: z.string().optional()
});
