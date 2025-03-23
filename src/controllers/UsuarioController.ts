import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';
import { UsuarioAttributes } from '../model/Usuario';
import { usuarioSchema } from '../validation/UsuarioValidation';
import { z } from 'zod';


// Buscar todos os usuários
export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    try {
        const usuarios: UsuarioAttributes[] = await UsuarioService.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

// Buscar usuário por ID
export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const usuario: UsuarioAttributes | null = await UsuarioService.getUsuarioById(Number(id));

        if (!usuario) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
};

// Criar um novo usuário
export const createUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const validetData = usuarioSchema.parse(req.body);
        const novoUsuario = await UsuarioService.createUsuario(validetData);
        res.status(201).json(novoUsuario);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send(error.errors); // Retorna os erros de validação
        } else {
            res.status(400).json({ error: (error as Error).message }); // mensagem de erro extraída do objeto de erro
        }
    }
};

// Atualizar usuário
export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Chama o serviço para atualizar o usuário
        const usuarioAtualizado = await UsuarioService.updateUsuario(Number(id), data);

        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};


// Deletar usuário (alterar status para 0)
export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const usuario: UsuarioAttributes | null = await UsuarioService.deleteUsuario(Number(id));

        if (!usuario) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário desativado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao desativar o usuário' });
    }
};
