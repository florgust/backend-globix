import { Request, Response } from 'express';
import { ViagemService } from '../services/ViagemService';
import { createViagemSchema } from '../validation/ViagemValidation';
import { z } from 'zod';
import { ViagemAttributes } from '../model/Viagem';

export const getViagens = async (req: Request, res: Response): Promise<void> => {
    try {
        const viagens:ViagemAttributes[] = await ViagemService.getViagens();
        res.status(200).send(viagens);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
};

export const getViagemById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const viagem:ViagemAttributes | null = await ViagemService.getViagemById(id);

        if (!viagem) {
            res.status(404).send('Viagem não encontrada');
        } else {
            res.status(200).send(viagem);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
};

export const createViagem = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validação dos dados de entrada
        const validatedData = createViagemSchema.parse(req.body);
        const viagem = await ViagemService.createViagem(validatedData);
        res.status(201).send(viagem);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send(error.errors); // Retorna os erros de validação
        } else {
            const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
            res.status(500).send(errorMessage);
        }
    }
};

export const updateViagem = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const viagem = await ViagemService.updateViagem(id, data);

        if (!viagem) {
            res.status(404).send('Viagem não encontrada');
        } else {
            res.status(200).send(viagem);
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
};

export const deleteViagem = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const viagem = await ViagemService.deleteViagem(id);

        if (!viagem) {
            res.status(404).send('Viagem não encontrada');
        } else {
            res.status(200).send('Viagem deletada com sucesso');
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
};