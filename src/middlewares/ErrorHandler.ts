import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { NotFoundError, BadRequestError, InternalServerError } from '@utils/Errors';

export const errorDefaultHandler = (customMessage = 'Erro interno do servidor') => {
    return (err: Error, req: Request, res: Response, next: NextFunction): void => {
        console.error(err.stack);

        // Verifica se o erro é do Zod (validação)
        if (err instanceof ZodError) {
            res.status(400).json({
                error: 'Erro de validação',
                details: err.errors,
            });
            return; // Interrompe a execução sem retornar um valor
        }

        // Verifica se é um erro personalizado
        if (err instanceof NotFoundError || err instanceof BadRequestError || err instanceof InternalServerError) {
            res.status(err.statusCode).json({
                error: err.message,
            });
            return; // Interrompe a execução sem retornar um valor
        }

        // Caso contrário, trata como erro interno do servidor
        res.status(500).json({ error: customMessage });
    };
};