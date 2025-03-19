import { Request, Response } from 'express';
import Usuario from '../model/Usuario';

export const getUsuarios = async (req: Request, res: Response): Promise<any> => {
    try {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};
