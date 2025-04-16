import { Request, Response } from 'express';
import LoginService from '@services/LoginService';
import { loginSchema } from '@validation/LoginValidation';
import { asyncHandler } from '@middlewares/AsyncHandler';

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Validação dos dados de entrada
    const validateLogin = loginSchema.parse(req.body);

    const result = await LoginService.validateUser(validateLogin.email, validateLogin.senha);
    res.status(result.status).json(result.data);
});