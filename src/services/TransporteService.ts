import Transporte, { TransporteAttributes } from '@models/Transporte';
import { NotFoundError } from '@utils/Errors';

export class TransporteService {
    // Buscar todos os transportes
    static async getTransportes(): Promise<TransporteAttributes[]> {
        return await Transporte.findAll();
    }

    // Buscar transporte por ID
    static async getTransporteById(id: number): Promise<TransporteAttributes> {
        const transporte = await Transporte.findByPk(id);
        if (!transporte) {
            throw new NotFoundError('Transporte não encontrado.');
        }
        return transporte;
    }

    // Criar um novo transporte
    static async createTransporte(data: Omit<TransporteAttributes, 'id'>): Promise<TransporteAttributes> {
        return await Transporte.create({
            ...data,
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
        });
    }

    // Atualizar transporte
    static async updateTransporte(id: number, data: Partial<Omit<TransporteAttributes, 'id'>>): Promise<TransporteAttributes> {
        const transporte = await Transporte.findByPk(id);
        if (!transporte) {
            throw new NotFoundError('Transporte não encontrado.');
        }
        return await transporte.update({
            ...data,
            dataAtualizacao: new Date(), // Atualiza a data de modificação
        });
    }

    // Deletar transporte
    static async deleteTransporte(id: number): Promise<{ message: string }> {
        const transporte = await Transporte.findByPk(id);
        if (!transporte) {
            throw new NotFoundError('Transporte não encontrado.');
        }
        await transporte.destroy();
        return { message: 'Transporte deletado com sucesso!' };
    }
}