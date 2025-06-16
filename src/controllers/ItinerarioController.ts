import { Request, Response } from 'express';
import { ItinerarioService } from '@services/ItinerarioService';
import { itinerarioSchema, itinerarioUpdateSchema } from '@validation/ItinerarioValidation';
import { asyncHandler } from '@middlewares/AsyncHandler';

// Buscar todos os itinerários
export const getItinerarios = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const itinerarios = await ItinerarioService.getItinerarios();
    res.status(200).send(itinerarios);
});

// Buscar itinerário por ID
export const getItinerarioById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const itinerario = await ItinerarioService.getItinerarioById(id);
    res.status(200).send(itinerario);
});

// Buscar itinerário por ID da Viagem
export const getItinerarioByIdViagem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const itinerario = await ItinerarioService.getItinerarioByIdViagem(id);
    res.status(200).send(itinerario);
});

// Criar um novo itinerário
export const createItinerario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validatedData = itinerarioSchema.parse(req.body); // Validação dos dados
    const itinerario = await ItinerarioService.createItinerario(validatedData);
    res.status(201).send(itinerario);
});

// Atualizar itinerário
export const updateItinerario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const validatedData = itinerarioUpdateSchema.parse(req.body); // Validação dos dados
    const itinerario = await ItinerarioService.updateItinerario(id, validatedData);
    res.status(200).send(itinerario);
});

// Deletar itinerário
export const deleteItinerario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const result = await ItinerarioService.deleteItinerario(id);
    res.status(200).send(result);
});