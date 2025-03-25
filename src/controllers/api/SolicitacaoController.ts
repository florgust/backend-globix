import { Request, Response } from 'express';
import { SolicitacaoService } from '../../services/SolicitacaoService';
import { SolicitacaoAttributes } from '../../model/Solicitacao';

// Buscar todas as solicitações de um usuário
export const getSolicitacoesPorUsuario = async (req: Request, res: Response): Promise<void> => {
    try {
        const { idUsuario } = req.params;
        const solicitacoes: SolicitacaoAttributes[] = await SolicitacaoService.getSolicitacoesPorUsuario(Number(idUsuario));
        res.status(200).json(solicitacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar solicitações do usuário' });
    }
};

// Buscar todas as solicitações de uma viagem
export const getSolicitacoesPorViagem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { idViagem } = req.params;
        const solicitacoes: SolicitacaoAttributes[] = await SolicitacaoService.getSolicitacoesPorViagem(Number(idViagem));
        res.status(200).json(solicitacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar solicitações da viagem' });
    }
};

// Criar uma nova solicitação
export const criarSolicitacao = async (req: Request, res: Response): Promise<void> => {
    try {
        const { idViagem, idUsuario } = req.params;
        
        const novaSolicitacao = await SolicitacaoService.criarSolicitacao(Number(idViagem), Number(idUsuario));
        res.status(201).json(novaSolicitacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar solicitação' });
    }
};

// Atualizar o status de uma solicitação
export const atualizarStatusSolicitacao = async (req: Request, res: Response): Promise<void> => {
    try {
        const { idViagem, idUsuario } = req.params;

        const solicitacaoAtualizada = await SolicitacaoService.atualizarStatusSolicitacao(Number(idViagem), Number(idUsuario));

        if (!solicitacaoAtualizada) {
            res.status(404).json({ error: 'Solicitação não encontrada' });
        } else {
            res.status(200).json(solicitacaoAtualizada);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar status da solicitação' });
    }
};
