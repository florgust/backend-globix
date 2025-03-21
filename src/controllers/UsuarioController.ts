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

export const getUsuarioById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params; // Pega o ID da URL
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
};


