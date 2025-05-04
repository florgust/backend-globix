import { Request, Response } from 'express';
import { TransporteService } from '@services/TransporteService';
import { transporteSchema, transporteUpdateSchema } from '@validation/TransporteValidation';
import { asyncHandler } from '@middlewares/AsyncHandler';

// Buscar todos os transportes
export const getTransportes = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const transportes = await TransporteService.getTransportes();
    res.status(200).send(transportes);
});

// Buscar transporte por ID
export const getTransporteById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const transporte = await TransporteService.getTransporteById(id);
    res.status(200).send(transporte);
});

// Criar um novo transporte
export const createTransporte = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const validatedData = transporteSchema.parse(req.body); // Validação dos dados
    const transporte = await TransporteService.createTransporte(validatedData);
    res.status(201).send(transporte);
});

// Atualizar transporte
export const updateTransporte = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const validatedData = transporteUpdateSchema.parse(req.body); // Validação dos dados
    const transporte = await TransporteService.updateTransporte(id, validatedData);
    res.status(200).send(transporte);
});

// Deletar transporte
export const deleteTransporte = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const result = await TransporteService.deleteTransporte(id);
    res.status(200).send(result);
});