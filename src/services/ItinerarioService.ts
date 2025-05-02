import Itinerario, { ItinerarioAttributes } from '@models/Itinerario';
import { NotFoundError } from '@utils/Errors';

export class ItinerarioService {
    // Buscar todos os itinerários
    static async getItinerarios(): Promise<ItinerarioAttributes[]> {
        return await Itinerario.findAll();
    }

    // Buscar itinerário por ID
    static async getItinerarioById(id: number): Promise<ItinerarioAttributes> {
        const itinerario = await Itinerario.findByPk(id);
        if (!itinerario) {
            throw new NotFoundError('Itinerário não encontrado.');
        }
        return itinerario;
    }

    // Criar um novo itinerário
    static async createItinerario(data: Omit<ItinerarioAttributes, 'id'>): Promise<ItinerarioAttributes> {
        return await Itinerario.create({
            ...data,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });
    }

    // Atualizar itinerário
    static async updateItinerario(id: number, data: Partial<Omit<ItinerarioAttributes, 'id'>>): Promise<ItinerarioAttributes> {
        const itinerario = await Itinerario.findByPk(id);
        if (!itinerario) {
            throw new NotFoundError('Itinerário não encontrado.');
        }
        return await itinerario.update({
            ...data,
            dataAtualizacao: new Date(), // Atualiza a data de modificação
        });
    }

    // Deletar itinerário
    static async deleteItinerario(id: number): Promise<{ message: string }> {
        const itinerario = await Itinerario.findByPk(id);
        if (!itinerario) {
            throw new NotFoundError('Itinerário não encontrado.');
        }
        await itinerario.destroy();
        return { message: 'Itinerário deletado com sucesso!' };
    }
}