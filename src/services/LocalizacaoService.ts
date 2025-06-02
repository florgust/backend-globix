import Localizacao, { LocalizacaoAttributes as LocalizacaoType } from "@models/Localizacao";
import { NotFoundError } from "@utils/Errors";

export class LocalizacaoService {
    // Buscar todas as localizações
    static async getLocalizacoes(): Promise<LocalizacaoType[]> {
        return await Localizacao.findAll();
    }

    // Buscar Localização por ID
    static async getLocalizacaoById(id: number): Promise<LocalizacaoType> {
        const localizacao = await Localizacao.findByPk(id);
        if (!localizacao) {
            throw new NotFoundError("Localização não encontrada.");
        }
        return localizacao;
    }

    static async getLocalizacaoByIdViagem(idViagem: number): Promise<LocalizacaoType[]> {
        const localizacoes = await Localizacao.findAll({ where: { idViagem } });
        if (!localizacoes || localizacoes.length === 0) {
            throw new NotFoundError("Nenhuma localização encontrada para esta viagem.");
        }
        return localizacoes;
    }

    // Criar nova localização com validação
    static async createLocalizacao(data: Omit<LocalizacaoType, "id" | "dataCriacao" | "dataAtualizacao">): Promise<LocalizacaoType> {
        return await Localizacao.create({
            ...data,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });
    }

    // Atualizar uma localização existente
    static async updateLocalizacao(id: number, data: Partial<Omit<LocalizacaoType, "id" | "dataCriacao">>): Promise<LocalizacaoType> {
        const localizacao = await Localizacao.findByPk(id);
        if (!localizacao) {
            throw new NotFoundError("Localização não encontrada.");
        }

        return await localizacao.update({
            ...data,
            dataAtualizacao: new Date(),
        });
    }

    // Deletar localização
    static async deleteLocalizacao(id: number): Promise<{ message: string }> {
        const localizacao = await Localizacao.findByPk(id);
        if (!localizacao) {
            throw new NotFoundError("Localização não encontrada.");
        }

        await localizacao.destroy();
        return { message: "Localização deletada com sucesso!" };
    }
}