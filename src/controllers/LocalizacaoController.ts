import { Request, Response } from 'express';
import { LocalizacaoService } from '../services/LocalizacaoService';
import { localizacaoSchema } from '../validation/LocalizacaoValidation';
import { LocalizacaoAttributes as LocalizacaoType} from '../model/Localizacao'; 

// Buscar todas as localizações
export const getLocalizacoes = async (req: Request, res: Response): Promise<void> => {
    try {
        const localizacoes: LocalizacaoType[] = await LocalizacaoService.getLocalizacoes();
        res.status(200).send(localizacoes)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar localizações' });
    }
};

// Buscar localização por ID
export const getLocalizacaoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const localizacao:  LocalizacaoType | null  = await LocalizacaoService.getLocalizacaoById(Number(id));

        if (!localizacao) {
            res.status(404).json({ error: 'Localização não encontrada' });
        }

        res.status(200).json(localizacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar a localização' });
    }
};

// Criar uma nova localização
export const createLocalizacao = async (req: Request, res: Response): Promise<void> => {
    try {
        const parsedData = localizacaoSchema.parse(req.body);
        const novaLocalizacao = await LocalizacaoService.createLocalizacao(parsedData);
        res.status(201).json(novaLocalizacao);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Atualizar localização
export const updateLocalizacao = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Chama o serviço para atualizar a localização
        const localizacaoAtualizada = await LocalizacaoService.updateLocalizacao(Number(id), data);

        res.json(localizacaoAtualizada);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Deletar localização
export const deleteLocalizacao = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const localizacao = await LocalizacaoService.deleteLocalização(Number(id));

        if (!localizacao) {
            res.status(404).json({ error: 'Localização não encontrada' });
        }

        res.json({ message: 'Localização deletada com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a localização' });
    }
};