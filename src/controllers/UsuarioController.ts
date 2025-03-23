import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';

// Buscar todos os usuários
export const getUsuarios = async (req: Request, res: Response): Promise<any> => {
    try {
        const usuarios = await UsuarioService.getUsuarios();
        return res.json(usuarios);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

// Buscar usuário por ID
export const getUsuarioById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioService.getUsuarioById(Number(id));

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.json(usuario);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
};

// Criar um novo usuário
export const createUsuario = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = req.body;
        const novoUsuario = await UsuarioService.createUsuario(data);
        return res.status(201).json(novoUsuario);
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message }); // mensagem de erro extraída do objeto de erro
    }
};

// Atualizar usuário
export const updateUsuario = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Chama o serviço para atualizar o usuário
        const usuarioAtualizado = await UsuarioService.updateUsuario(Number(id), data);

        return res.json(usuarioAtualizado);
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
};


// Deletar usuário (alterar status para 0)
export const deleteUsuario = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const usuario = await UsuarioService.deleteUsuario(Number(id));

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.json({ message: 'Usuário desativado com sucesso.' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao desativar o usuário' });
    }
};
