import { Request, Response } from 'express';
import { SolicitacaoService } from '@services/SolicitacaoService';
import { SolicitacaoAttributes, SolicitacaoViagemCard } from '@models/Solicitacao';
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

export const getSolicitacoesViagemToCard = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idUsuario } = req.params;
    const solicitacoesRaw = await SolicitacaoService.getSolicitacoesViagemToCard(Number(idUsuario));
    const solicitacoes: SolicitacaoViagemCard[] = solicitacoesRaw.map((s: any) => ({
        ...s,
        imagem: s.imagem ?? ""
    }));
    res.status(200).json(solicitacoes);
});

export const getSolicitacoesViagemToCardCommunity = asyncHandler (async (req: Request, res: Response): Promise<void> => {
    const { idUsuario } = req.params;
    try {
        const viagens = await SolicitacaoService.getSolicitacoesViagemToCardCommunity(Number(idUsuario));
        res.status(200).json(viagens);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar viagens da comunidade." });
    }
});

// Criar uma nova solicitação
export const criarSolicitacao = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idViagem, idUsuario } = req.params;
    const novaSolicitacao = await SolicitacaoService.criarSolicitacao(Number(idViagem), Number(idUsuario));
    res.status(201).json(novaSolicitacao);
});

export const criarSolicitacaoCriadorViagem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try{
const { idViagem, idUsuario } = req.params;
    const novaSolicitacao = await SolicitacaoService.criarSolicitacaoCriadorViagem(Number(idViagem), Number(idUsuario));
    res.status(201).json(novaSolicitacao);
    }
    catch (error:any) {
    console.error("Erro ao criar solicitação:", error);
    res.status(400).json({ error: error.message });
  }
});

export const promoverOuDespromoverOrganizadorSolicitacao = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idViagem, idUsuarioOrganizador } = req.params;
    const { idUsuarioSolicitante } = req.body;
    const novaSolicitacao = await SolicitacaoService.promoverOuDespromoverOrganizadorSolicitacao(Number(idViagem), Number(idUsuarioOrganizador), Number(idUsuarioSolicitante));
    res.status(201).json(novaSolicitacao);
});

export const encerrarViagem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idViagem } = req.params;
    const resultado = await SolicitacaoService.encerrarViagem(Number(idViagem));
    res.status(200).json(resultado);
});

// Atualizar o status de uma solicitação
export const atualizarInseridoSolicitacao = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idViagem, idUsuario } = req.params;

    const solicitacaoAtualizada = await SolicitacaoService.atualizarInseridoSolicitacao(Number(idViagem), Number(idUsuario));

    if (!solicitacaoAtualizada) {
        res.status(404).json({ error: 'Solicitação não encontrada' });
    } else {
        res.status(200).json(solicitacaoAtualizada);
    }
});

export const excluirSolicitacao = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idViagem, idUsuario } = req.params;
    const resultado = await SolicitacaoService.excluirSolicitacao(Number(idViagem), Number(idUsuario));
    res.status(200).json(resultado);
});