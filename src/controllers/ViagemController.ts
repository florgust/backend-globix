import { Request, Response } from 'express';
import { ViagemService } from '@services/ViagemService';
import { createViagemSchema } from '@validation/ViagemValidation';
import { z } from 'zod';
import { ViagemAttributes } from '@models/Viagem';

export const getViagens = async (req: Request, res: Response): Promise<void> => {
    console.log('GET /viagens - Iniciando busca de todas as viagens');
    try {
        const viagens: ViagemAttributes[] = await ViagemService.getViagens();
        console.log('GET /viagens - Viagens encontradas:', viagens);
        res.status(200).send(viagens);
    } catch (error) {
        console.error('GET /viagens - Erro ao buscar viagens:', error);
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
};

export const getViagemById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    console.log(`GET /viagens/${id} - Iniciando busca da viagem com ID ${id}`);
    try {
        const viagem: ViagemAttributes | null = await ViagemService.getViagemById(id);

        if (!viagem) {
            console.warn(`GET /viagens/${id} - Viagem não encontrada`);
            res.status(404).send('Viagem não encontrada');
        } else {
            console.log(`GET /viagens/${id} - Viagem encontrada:`, viagem);
            res.status(200).send(viagem);
        }
    } catch (error) {
        console.error(`GET /viagens/${id} - Erro ao buscar viagem:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
};

export const createViagem = async (req: Request, res: Response): Promise<void> => {
    console.log('POST /viagens - Dados recebidos para criação:', req.body);
    try {
        const validatedData = createViagemSchema.parse(req.body);
        const viagem = await ViagemService.createViagem(validatedData);
        console.log('POST /viagens - Viagem criada com sucesso:', viagem);
        res.status(201).send(viagem);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.warn('POST /viagens - Erros de validação:', error.errors);
            res.status(400).send(error.errors); // Retorna os erros de validação
        } else {
            console.error('POST /viagens - Erro ao criar viagem:', error);
            const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
            res.status(500).send(errorMessage);
        }
    }
};

export const updateViagem = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    console.log(`PUT /viagens/${id} - Dados recebidos para atualização:`, req.body);
    try {
        const data = req.body;
        const viagem = await ViagemService.updateViagem(id, data);

        if (!viagem) {
            console.warn(`PUT /viagens/${id} - Viagem não encontrada`);
            res.status(404).send('Viagem não encontrada');
        } else {
            console.log(`PUT /viagens/${id} - Viagem atualizada com sucesso:`, viagem);
            res.status(200).send(viagem);
        }
    } catch (error) {
        console.error(`PUT /viagens/${id} - Erro ao atualizar viagem:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
};

export const deleteViagem = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    console.log(`DELETE /viagens/${id} - Iniciando exclusão da viagem com ID ${id}`);
    try {
        const viagem = await ViagemService.deleteViagem(id);

        if (!viagem) {
            console.warn(`DELETE /viagens/${id} - Viagem não encontrada`);
            res.status(404).send('Viagem não encontrada');
        } else {
            console.log(`DELETE /viagens/${id} - Viagem deletada com sucesso`);
            res.status(200).send('Viagem deletada com sucesso');
        }
    } catch (error) {
        console.error(`DELETE /viagens/${id} - Erro ao deletar viagem:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Um erro desconhecido ocorreu';
        res.status(500).send(errorMessage);
    }
};