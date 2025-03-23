import Localizacao from "../model/Localizacao";
import { LocalizacaoAttributes as LocalizacaoType } from "../model/Localizacao";

export class LocalizacaoService {
    // Buscar todas as localizações
    static async getLocalizacoes(): Promise<LocalizacaoType[]> {
        return await Localizacao.findAll();
    }

    // Buscar Localização por ID
    static async getLocalizacaoById(id: number): Promise<LocalizacaoType | null> {
        return await Localizacao.findByPk(id);
    }

    // Criar nova localização com validação 
    static async createLocalizacao(data: Omit<LocalizacaoType, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<LocalizacaoType> {
        return await Localizacao.create({
            ...data,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });
    }

    // Atualizar uma localização existente
    static async updateLocalizacao(id: number, data: Partial<Omit<LocalizacaoType, 'id' | 'dataCriacao'>>): Promise<LocalizacaoType> {
        // Verificar se a localização existe
        const localizacao = await Localizacao.findByPk(id);
        if (!localizacao) {
            throw new Error('Localização não encontrada.');
        }

        // Atualizar os campos fornecidos
        return await localizacao.update({
            ...data,
            dataAtualizacao: new Date(), // Atualiza a data de modificação
        });
    }

    // Deletar localização
    static async deleteLocalização(id: number): Promise<{ message: string }> {
        const localizacao = await Localizacao.findByPk(id);
        if (!localizacao) {
            throw new Error('Deletar localização --> Localização não encontrada!');
        }

        // Deletar a localização
        await localizacao.destroy();
        return { message: 'Localização deletada com sucesso!' };
    }
}