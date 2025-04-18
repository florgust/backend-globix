import { BadRequestError } from '@utils/Errors';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        throw new BadRequestError('Token não fornecido ou inválido.');
    }

    const token = authHeader.split(' ')[1];

    // Chama o método do AuthService para validar o token
    const secret = process.env.JWT_PUBLIC_SECRET!.replace(/\\n/g, '\n');
    const decoded = jwt.verify(token, secret, { algorithms: ['RS256'] });

    req.user = decoded; // Adiciona os dados do usuário ao objeto `req`
    next();
};
