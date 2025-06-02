import { Request, Response } from 'express';
import { LocalizacaoService } from '@services/LocalizacaoService';
import { localizacaoSchema } from '@validation/LocalizacaoValidation';
import { LocalizacaoAttributes as LocalizacaoType } from '@models/Localizacao';
import { asyncHandler } from '@middlewares/AsyncHandler';

// Buscar todas as localizações
export const getLocalizacoes = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const localizacoes: LocalizacaoType[] = await LocalizacaoService.getLocalizacoes();
    res.status(200).send(localizacoes);
});

// Buscar localização por ID
export const getLocalizacaoById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const localizacao: LocalizacaoType | null = await LocalizacaoService.getLocalizacaoById(Number(id));

    res.status(200).json(localizacao);
});

export const getLocalizacaoByIdViagem = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { idViagem } = req.params;
    const localizacoes = await LocalizacaoService.getLocalizacaoByIdViagem(Number(idViagem));
    res.status(200).json(localizacoes);
});


// Criar uma nova localização
export const createLocalizacao = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const parsedData = localizacaoSchema.parse(req.body);

    const novaLocalizacao = await LocalizacaoService.createLocalizacao(parsedData);

    res.status(201).json(novaLocalizacao);
});

// Atualizar localização
export const updateLocalizacao = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = req.body;

    const localizacaoAtualizada = await LocalizacaoService.updateLocalizacao(Number(id), data);

    res.json(localizacaoAtualizada);
});

// Deletar localização
export const deleteLocalizacao = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    await LocalizacaoService.deleteLocalizacao(Number(id));

    res.json({ message: 'Localização deletada com sucesso.' });
});