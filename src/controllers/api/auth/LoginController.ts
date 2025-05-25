import { asyncHandler } from '@middlewares/AsyncHandler';
import LoginService from '@services/LoginService';
import { loginSchema } from '@validation/LoginValidation';
import { Request, Response } from 'express';

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // Validação dos dados de entrada
    const validateLogin = loginSchema.parse(req.body);

    const result = await LoginService.validateUser(validateLogin.email, validateLogin.senha);
    console.log(result);
    res.status(200).json({token: result.token, usuario: result.usuario});
});