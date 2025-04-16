import { Request, Response } from 'express';
import { UsuarioService } from '@services/UsuarioService';
import { UsuarioAttributes } from '@models/Usuario';
import { usuarioSchema } from '@validation/UsuarioValidation';
import { z } from 'zod';


// Buscar todos os usuários
export const getUsuarios = async (req: Request, res: Response): Promise<void> => {
    console.log('GET /usuarios - Iniciando busca de todos os usuários');
    try {
        const usuarios: UsuarioAttributes[] = await UsuarioService.getUsuarios();
        console.log('GET /usuarios - Usuários encontrados:', usuarios);
        res.json(usuarios);
    } catch (error) {
        console.error('GET /usuarios - Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

// Buscar usuário por ID
export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`GET /usuarios/${id} - Iniciando busca do usuário com ID ${id}`);
    try {
        const usuario: UsuarioAttributes | null = await UsuarioService.getUsuarioById(Number(id));

        if (!usuario) {
            console.warn(`GET /usuarios/${id} - Usuário não encontrado`);
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        console.log(`GET /usuarios/${id} - Usuário encontrado:`, usuario);
        res.json(usuario);
    } catch (error) {
        console.error(`GET /usuarios/${id} - Erro ao buscar usuário:`, error);
        res.status(500).json({ error: 'Erro ao buscar o usuário' });
    }
};

// Criar um novo usuário
export const createUsuario = async (req: Request, res: Response): Promise<void> => {
    console.log('POST /usuarios - Dados recebidos para criação:', req.body);
    try {
        const validetData = usuarioSchema.parse(req.body);
        const novoUsuario = await UsuarioService.createUsuario(validetData);
        console.log('POST /usuarios - Usuário criado com sucesso:', novoUsuario);
        res.status(201).json(novoUsuario);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.warn('POST /usuarios - Erros de validação:', error.errors);
            res.status(400).send(error.errors); // Retorna os erros de validação
        } else {
            console.error('POST /usuarios - Erro ao criar usuário:', error);
            res.status(400).json({ error: (error as Error).message });
        }
    }
};

// Atualizar usuário
export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`PUT /usuarios/${id} - Dados recebidos para atualização:`, req.body);
    try {
        const data = req.body;

        // Chama o serviço para atualizar o usuário
        const usuarioAtualizado = await UsuarioService.updateUsuario(Number(id), data);
        console.log(`PUT /usuarios/${id} - Usuário atualizado com sucesso:`, usuarioAtualizado);
        res.json(usuarioAtualizado);
    } catch (error) {
        console.error(`PUT /usuarios/${id} - Erro ao atualizar usuário:`, error);
        res.status(400).json({ error: (error as Error).message });
    }
};

// Deletar usuário (alterar status para 0)
export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`DELETE /usuarios/${id} - Iniciando exclusão lógica do usuário com ID ${id}`);
    try {
        const usuario: UsuarioAttributes | null = await UsuarioService.deleteUsuario(Number(id));

        if (!usuario) {
            console.warn(`DELETE /usuarios/${id} - Usuário não encontrado`);
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        console.log(`DELETE /usuarios/${id} - Usuário desativado com sucesso`);
        res.json({ message: 'Usuário desativado com sucesso.' });
    } catch (error) {
        console.error(`DELETE /usuarios/${id} - Erro ao desativar usuário:`, error);
        res.status(500).json({ error: 'Erro ao desativar o usuário' });
    }
};
