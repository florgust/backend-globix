import { Request, Response } from 'express';
import { ViagemService } from '@services/ViagemService';
import { createViagemSchema } from '@validation/ViagemValidation';
import { ViagemAttributes } from '@models/Viagem';
import { asyncHandler } from '@middlewares/AsyncHandler';

// Buscar todas as viagens
export const getViagens = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('GET /viagens - Iniciando busca de todas as viagens');

    const viagens: ViagemAttributes[] = await ViagemService.getViagens();

    console.log('GET /viagens - Viagens encontradas:', viagens);
    res.status(200).send(viagens);
});

// Buscar viagem por ID
export const getViagemById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    console.log(`GET /viagens/${id} - Iniciando busca da viagem com ID ${id}`);

    const viagem: ViagemAttributes | null = await ViagemService.getViagemById(id);

    console.log(`GET /viagens/${id} - Viagem encontrada:`, viagem);
    res.status(200).send(viagem);
});

// Criar uma nova viagem
export const createViagem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log('POST /viagens - Dados recebidos para criação:', req.body);
    const validatedData = createViagemSchema.parse(req.body);
    console.log('POST /viagens - Dados validados para criação:', req.body);
    const viagem = await ViagemService.createViagem(validatedData);

    console.log('POST /viagens - Viagem criada com sucesso:', viagem);
    res.status(201).send(viagem);
});

// Atualizar viagem
export const updateViagem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    console.log(`PUT /viagens/${id} - Dados recebidos para atualização:`, req.body);
    const data = req.body;

    const viagem = await ViagemService.updateViagem(id, data);

    console.log(`PUT /viagens/${id} - Viagem atualizada com sucesso:`, viagem);
    res.status(200).send(viagem);
});

// Deletar viagem
export const deleteViagem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    console.log(`DELETE /viagens/${id} - Iniciando exclusão da viagem com ID ${id}`);

    await ViagemService.deleteViagem(id);

    console.log(`DELETE /viagens/${id} - Viagem deletada com sucesso`);
    res.status(200).send('Viagem deletada com sucesso');
});