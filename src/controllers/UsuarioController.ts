import { Request, Response } from 'express';
import { UsuarioService } from '@services/UsuarioService';
import { UsuarioAttributes } from '@models/Usuario';
import { usuarioSchema } from '@validation/UsuarioValidation';
import { asyncHandler } from '@middlewares/AsyncHandler';

// Buscar todos os usuários
export const getUsuarios = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('GET /usuarios - Iniciando busca de todos os usuários');

    const usuarios: UsuarioAttributes[] = await UsuarioService.getUsuarios();

    console.log('GET /usuarios - Usuários encontrados:', usuarios);
    res.json(usuarios);
});

export const getUsuariosComFoto = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('GET /usuarios/fotos - Iniciando busca de todos os usuários com fotos');
    
    const usuarios = await UsuarioService.getUsuariosComFoto();
    
    console.log('GET /usuarios/fotos - Usuários encontrados:', usuarios.length);
    res.json(usuarios);
});

// Buscar usuário por ID
export const getUsuarioById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`GET /usuarios/${id} - Iniciando busca do usuário com ID ${id}`);

    const usuario: UsuarioAttributes | null = await UsuarioService.getUsuarioById(Number(id));

    console.log(`GET /usuarios/${id} - Usuário encontrado:`, usuario);
    res.json(usuario);
});

export const getUsuarioComFotoById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`GET /usuarios/${id}/foto - Iniciando busca com foto`);

    const usuario = await UsuarioService.getUsuarioComFotoById(Number(id));

    console.log(`GET /usuarios/${id}/foto - Usuário encontrado:`, usuario);
    res.json(usuario);
});

// Criar um novo usuário
export const createUsuario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('POST /usuarios - Dados recebidos para criação:', req.body);
    const validetData = usuarioSchema.parse(req.body);
    console.log('POST /usuarios - Dados validados para criação:', validetData);
    const novoUsuario = await UsuarioService.createUsuario(validetData);

    console.log('POST /usuarios - Usuário criado com sucesso:', novoUsuario);
    res.status(201).json(novoUsuario);
});

// Atualizar usuário
export const updateUsuario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`PUT /usuarios/${id} - Dados recebidos para atualização:`, req.body);
    const data = req.body;

    // Chama o serviço para atualizar o usuário
    const usuarioAtualizado = await UsuarioService.updateUsuario(Number(id), data);

    console.log(`PUT /usuarios/${id} - Usuário atualizado com sucesso:`, usuarioAtualizado);
    res.json(usuarioAtualizado);
});

// Atualizar senha do usuário
export const updateUsuarioSenha = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`PUT /usuarios/senha/${id}`);
    const { senhaAtual, senhaNova } = req.body;

    // Chama o serviço para atualizar a senha do usuário
    await UsuarioService.updateSenhaUsuario(Number(id), senhaAtual, senhaNova);

    console.log(`PUT /usuarios/senha/${id} - Senha do usuário atualizada com sucesso`);
    res.json({ message: 'Senha atualizada com sucesso.' });
});

// Deletar usuário (alterar status para 0)
export const deleteUsuario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`DELETE /usuarios/${id} - Iniciando exclusão lógica do usuário com ID ${id}`);

    await UsuarioService.deleteUsuario(Number(id));
    
    console.log(`DELETE /usuarios/${id} - Usuário desativado com sucesso`);
    res.json({ message: 'Usuário desativado com sucesso.' });
});