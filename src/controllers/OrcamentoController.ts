import { Request, Response } from 'express';
import { OrcamentoService } from '@services/OrcamentoService';
import { orcamentoSchema } from '@validation/OrcamentoValidation';
import { OrcamentoAttributes as OrcamentoType } from '@models/Orcamento';
import { asyncHandler } from '@middlewares/AsyncHandler';

// Buscar todos os orçamentos
export const getOrcamentos = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const orcamentos: OrcamentoType[] = await OrcamentoService.getOrcamentos();
    res.status(200).send(orcamentos);
});

// Buscar orçamento por ID
export const getOrcamentoById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const orcamento: OrcamentoType | null = await OrcamentoService.getOrcamentoById(Number(id));
    res.status(200).json(orcamento);
});

// Criar um novo orçamento
export const createOrcamento = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const parsedData = orcamentoSchema.parse(req.body);
    const novoOrcamento = await OrcamentoService.createOrcamento(parsedData);
    res.status(201).json(novoOrcamento);
});

// Atualizar orçamento
export const updateOrcamento = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = req.body;
    const orcamentoAtualizado = await OrcamentoService.updateOrcamento(Number(id), data);
    res.json(orcamentoAtualizado);
});

// Delete lógico de orçamento
export const deleteOrcamento = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await OrcamentoService.deleteOrcamento(Number(id));
    res.json({ message: 'Orçamento deletado com sucesso.' });
});