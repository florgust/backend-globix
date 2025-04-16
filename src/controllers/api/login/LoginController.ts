import { Request, Response } from 'express';
import LoginService from '@services/LoginService';
import { loginSchema } from '@validation/LoginValidation';


export const login = async (req: Request, res: Response): Promise<void> => {
    // Validação dos dados de entrada
    const validateLogin = loginSchema.parse(req.body)

    try {
        const result = await LoginService.validateUser(validateLogin.email, validateLogin.senha);
        res.status(result.status).json(result.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}
