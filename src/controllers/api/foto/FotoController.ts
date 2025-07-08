import { Request, Response } from 'express';
import FotoService from '@services/FotoService';
import { FotoAttributes } from '@models/Foto';
import { asyncHandler } from '@middlewares/AsyncHandler';
// Upload foto de perfil
export const uploadFotoPerfil = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { usuarioId } = req.params;
    
    if (!req.file) {
        res.status(400).json({ error: 'Arquivo de imagem não enviado.' });
        return;
    }

    console.log(`POST /fotos/perfil/${usuarioId} - Iniciando upload da foto de perfil`);
    
    const foto: FotoAttributes = await FotoService.uploadFotoPerfil(req.file, Number(usuarioId));
    
    console.log(`POST /fotos/perfil/${usuarioId} - Foto de perfil criada com sucesso:`, foto);
    res.status(201).json(foto);
});

// Upload foto de capa da viagem
export const uploadFotoCapa = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    
    const { viagemId } = req.params;
    console.log("FOTO CAPA recebido:", req.file);

    if (!req.file) {
        res.status(400).json({ error: 'Arquivo de imagem não enviado.' });
        return;
    }

    console.log(`POST /fotos/capa/${viagemId} - Iniciando upload da foto de capa`);
    
    const foto: FotoAttributes = await FotoService.uploadFotoCapa(req.file, Number(viagemId));
    
    console.log(`POST /fotos/capa/${viagemId} - Foto de capa criada com sucesso:`, foto);
    res.status(201).json(foto);
});

// Buscar foto por ID
export const getFotoById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`GET /fotos/${id} - Iniciando busca da foto com ID ${id}`);

    const foto: FotoAttributes = await FotoService.getFotoById(Number(id));

    console.log(`GET /fotos/${id} - Foto encontrada:`, foto);
    res.json(foto);
});

// Buscar foto de perfil do usuário
export const getFotoPerfil = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { usuarioId } = req.params;
    console.log(`GET /fotos/perfil/${usuarioId} - Iniciando busca da foto de perfil`);

    const foto: FotoAttributes | null = await FotoService.getFotoPerfil(Number(usuarioId));

    if (!foto) {
        console.log(`GET /fotos/perfil/${usuarioId} - Foto de perfil não encontrada`);
        res.status(404).json({ error: 'Foto de perfil não encontrada.' });
        return;
    }

    console.log(`GET /fotos/perfil/${usuarioId} - Foto de perfil encontrada:`, foto);
    res.json(foto);
});

// Buscar foto de capa da viagem
export const getFotoCapa = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { viagemId } = req.params;
    console.log(`GET /fotos/capa/${viagemId} - Iniciando busca da foto de capa`);

    const foto: FotoAttributes | null = await FotoService.getFotoCapa(Number(viagemId));

    if (!foto) {
        console.log(`GET /fotos/capa/${viagemId} - Foto de capa não encontrada`);
        res.status(404).json({ error: 'Foto de capa não encontrada.' });
        return;
    }

    console.log(`GET /fotos/capa/${viagemId} - Foto de capa encontrada:`, foto);
    res.json(foto);
});

// Atualizar foto
export const updateFoto = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    
    if (!req.file) {
        res.status(400).json({ error: 'Arquivo de imagem não enviado.' });
        return;
    }

    console.log(`PUT /fotos/${id} - Iniciando atualização da foto`);

    const fotoAtualizada: FotoAttributes = await FotoService.updateFoto(Number(id), req.file);

    console.log(`PUT /fotos/${id} - Foto atualizada com sucesso:`, fotoAtualizada);
    res.json(fotoAtualizada);
});

// Deletar foto
export const deleteFoto = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`DELETE /fotos/${id} - Iniciando exclusão da foto com ID ${id}`);

    const resultado = await FotoService.deleteFoto(Number(id));

    console.log(`DELETE /fotos/${id} - Foto deletada com sucesso`);
    res.json(resultado);
});
