import { Request, Response } from 'express';
import { LocalizacaoService } from '../services/LocalizacaoService';
import { localizacaoSchema } from '../validation/LocalizacaoValidation';
import { LocalizacaoAttributes as LocalizacaoType} from '../model/Localizacao'; 

// Buscar todas as localizações
export const getLocalizacoes = async (req: Request, res: Response): Promise<void> => {
    console.log('GET /localizacoes - Iniciando busca de todas as localizações');
    try {
        const localizacoes: LocalizacaoType[] = await LocalizacaoService.getLocalizacoes();
        console.log('GET /localizacoes - Localizações encontradas:', localizacoes);
        res.status(200).send(localizacoes);
    } catch (error) {
        console.error('GET /localizacoes - Erro ao buscar localizações:', error);
        res.status(500).json({ error: 'Erro ao buscar localizações' });
    }
};

// Buscar localização por ID
export const getLocalizacaoById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`GET /localizacoes/${id} - Iniciando busca da localização com ID ${id}`);
    try {
        const localizacao: LocalizacaoType | null = await LocalizacaoService.getLocalizacaoById(Number(id));

        if (!localizacao) {
            console.warn(`GET /localizacoes/${id} - Localização não encontrada`);
            res.status(404).json({ error: 'Localização não encontrada' });
            return;
        }

        console.log(`GET /localizacoes/${id} - Localização encontrada:`, localizacao);
        res.status(200).json(localizacao);
    } catch (error) {
        console.error(`GET /localizacoes/${id} - Erro ao buscar localização:`, error);
        res.status(500).json({ error: 'Erro ao buscar a localização' });
    }
};

// Criar uma nova localização
export const createLocalizacao = async (req: Request, res: Response): Promise<void> => {
    console.log('POST /localizacoes - Dados recebidos para criação:', req.body);
    try {
        const parsedData = localizacaoSchema.parse(req.body);
        const novaLocalizacao = await LocalizacaoService.createLocalizacao(parsedData);
        console.log('POST /localizacoes - Localização criada com sucesso:', novaLocalizacao);
        res.status(201).json(novaLocalizacao);
    } catch (error) {
        console.error('POST /localizacoes - Erro ao criar localização:', error);
        res.status(400).json({ error: (error as Error).message });
    }
};


// Atualizar localização
export const updateLocalizacao = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`PUT /localizacoes/${id} - Dados recebidos para atualização:`, req.body);
    try {
        const data = req.body;
        const localizacaoAtualizada = await LocalizacaoService.updateLocalizacao(Number(id), data);
        console.log(`PUT /localizacoes/${id} - Localização atualizada com sucesso:`, localizacaoAtualizada);
        res.json(localizacaoAtualizada);
    } catch (error) {
        console.error(`PUT /localizacoes/${id} - Erro ao atualizar localização:`, error);
        res.status(400).json({ error: (error as Error).message });
    }
};

// Deletar localização
export const deleteLocalizacao = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    console.log(`DELETE /localizacoes/${id} - Iniciando exclusão da localização com ID ${id}`);
    try {
        const localizacao = await LocalizacaoService.deleteLocalização(Number(id));

        if (!localizacao) {
            console.warn(`DELETE /localizacoes/${id} - Localização não encontrada`);
            res.status(404).json({ error: 'Localização não encontrada' });
            return;
        }

        console.log(`DELETE /localizacoes/${id} - Localização deletada com sucesso`);
        res.json({ message: 'Localização deletada com sucesso.' });
    } catch (error) {
        console.error(`DELETE /localizacoes/${id} - Erro ao deletar localização:`, error);
        res.status(500).json({ error: 'Erro ao deletar a localização' });
    }
};