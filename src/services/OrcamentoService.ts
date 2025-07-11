import Orcamento, { OrcamentoAttributes as OrcamentoType } from "@models/Orcamento";
import { NotFoundError } from "@utils/Errors";

export class OrcamentoService {
    // Buscar todos os orçamentos
    static async getOrcamentos(): Promise<OrcamentoType[]> {
        return await Orcamento.findAll();
    }

    // Buscar orçamento por ID
    static async getOrcamentoById(id: number): Promise<OrcamentoType> {
        const orcamento = await Orcamento.findByPk(id);
        if (!orcamento) {
            throw new NotFoundError("Orçamento não encontrado.");
        }
        return orcamento;
    }

    // Buscar orçamento por ID
    static async getOrcamentoByIdViagem(id: number): Promise<OrcamentoType[]> {
        return await Orcamento.findAll({
                where: { viagemId: id}
        });
    }


    // Criar novo orçamento
    static async createOrcamento(data: Omit<OrcamentoType, "id" | "dataCriacao" | "dataAtualizacao">): Promise<OrcamentoType> {
        return await Orcamento.create({
            ...data,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });
    }

    // Atualizar orçamento existente
    static async updateOrcamento(id: number, data: Partial<Omit<OrcamentoType, "id" | "dataCriacao">>): Promise<OrcamentoType> {
        const orcamento = await Orcamento.findByPk(id);
        if (!orcamento) {
            throw new NotFoundError("Orçamento não encontrado.");
        }
        return await orcamento.update({
            ...data,
            dataAtualizacao: new Date(),
        });
    }

    // Deletar orçamento (delete lógico)
    static async deleteOrcamento(id: number): Promise<{ message: string }> {
        const orcamento = await Orcamento.findByPk(id);
        if (!orcamento) {
            throw new NotFoundError("Orçamento não encontrado.");
        }
        await orcamento.destroy();
        return { message: "Orçamento deletado com sucesso!" };
    }
}