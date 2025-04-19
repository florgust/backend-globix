import { Request, Response } from 'express';
import { SolicitacaoService } from '@services/SolicitacaoService';
import { SolicitacaoAttributes } from '@models/Solicitacao';
import { asyncHandler } from '@middlewares/AsyncHandler';

// Buscar todas as solicitações de um usuário
export const getSolicitacoesPorUsuario = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idUsuario } = req.params;
    const solicitacoes: SolicitacaoAttributes[] = await SolicitacaoService.getSolicitacoesPorUsuario(Number(idUsuario));
    res.status(200).json(solicitacoes);
});

// Buscar todas as solicitações de uma viagem
export const getSolicitacoesPorViagem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idViagem } = req.params;
    const solicitacoes: SolicitacaoAttributes[] = await SolicitacaoService.getSolicitacoesPorViagem(Number(idViagem));
    res.status(200).json(solicitacoes);
});

// Criar uma nova solicitação
export const criarSolicitacao = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idViagem, idUsuario } = req.params;
    const novaSolicitacao = await SolicitacaoService.criarSolicitacao(Number(idViagem), Number(idUsuario));
    res.status(201).json(novaSolicitacao);
});

// Atualizar o status de uma solicitação
export const atualizarStatusSolicitacao = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idViagem, idUsuario } = req.params;

    const solicitacaoAtualizada = await SolicitacaoService.atualizarStatusSolicitacao(Number(idViagem), Number(idUsuario));

    if (!solicitacaoAtualizada) {
        res.status(404).json({ error: 'Solicitação não encontrada' });
    } else {
        res.status(200).json(solicitacaoAtualizada);
    }
});