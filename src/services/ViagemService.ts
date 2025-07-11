import Viagem, { ViagemAttributes } from '@models/Viagem';
import UsuarioViagem from '@models/Solicitacao'; // Importe o model correto
import { NotFoundError } from '@utils/Errors';
import Orcamento from '@models/Orcamento';
import Transporte from '@models/Transporte';
import Itinerario from '@models/Itinerario';
import Localizacao from '@models/Localizacao';
import { criarNotificacao } from '@utils/notificacaoUtils';
import Solicitacao from '@models/Solicitacao';
import Foto from '@models/Foto';

export class ViagemService {
    // Buscar todas as viagens
    public static async getViagens(): Promise<ViagemAttributes[]> {
        try {
            return await Viagem.findAll();
        } catch (error) {
            console.error('Erro ao buscar viagens:', error); // Exibe o erro completo
            throw error; // Repassa o erro para ser tratado no controller
        }
    }
    
    public static async getViagensComFoto(): Promise<any[]> {
        try {
            const viagens = await Viagem.findAll({
                include: [{
                    model: Foto,
                    as: 'fotoCapa',
                    attributes: ['id', 'url'],
                    required: false // LEFT JOIN - viagem pode não ter foto
                }]
            });

            // Formatar resposta incluindo URL da foto
            return viagens.map(viagem => ({
                ...viagem.toJSON(),
                url: viagem.fotoCapa?.url || null
            }));
        } catch (error) {
            console.error('Erro ao buscar viagens com foto:', error);
            throw error;
        }
    }

    // Buscar viagem por ID
    public static async getViagemById(id: number): Promise<ViagemAttributes> {
        const viagem = await Viagem.findByPk(id);
        if (!viagem) {
            throw new NotFoundError('Viagem não encontrada.');
        }
        return viagem;
    }

    public static async getViagemComFotoById(id: number): Promise<any> {
        const viagem = await Viagem.findByPk(id, {
            include: [{
                model: Foto,
                as: 'fotoCapa',
                attributes: ['id', 'url']
            }]
        });
        
        if (!viagem) {
            throw new NotFoundError('Viagem não encontrada.');
        }

        // Formatar resposta incluindo URL da foto
        return {
            ...viagem.toJSON(),
            url: viagem.fotoCapa?.url || null
        };
    }

    // Buscar viagem por código de convite
    public static async getViagemByCodigoConvite(codigoConvite: number): Promise<ViagemAttributes> {
        const viagem = await Viagem.findOne({ where: { codigoConvite } });
        if (!viagem) {
            throw new NotFoundError('Viagem não encontrada com o código de convite fornecido.');
        }
        return viagem;
    }

    public static async getViagemComFotoByCodigoConvite(codigoConvite: number): Promise<any> {
        const viagem = await Viagem.findOne({ 
            where: { codigoConvite },
            include: [{
                model: Foto,
                as: 'fotoCapa',
                attributes: ['id', 'url'],
                required: false
            }]
        });
        
        if (!viagem) {
            throw new NotFoundError('Viagem não encontrada com o código de convite fornecido.');
        }

        return {
            ...viagem.toJSON(),
            url: viagem.fotoCapa?.url || null
        };
    }

    // Criar nova viagem com validação
    static async createViagem(data: Omit<ViagemAttributes, 'id' | 'codigoConvite' | 'status' | 'dataCriacao' | 'dataAtualizacao'>): Promise<ViagemAttributes> {
        // Criar a viagem no banco de dados com dataCriacao e dataAtualizacao
        const codigoConvite = await this.createCodigoConvite(); // Chama o método de instância
        
        return await Viagem.create({
            ...data,
            codigoConvite: codigoConvite, // Configura o código de convite
            status: 1, // Configura o status da viagem
            dataCriacao: new Date(), // Configura a data de criação
            dataAtualizacao: new Date(), // Configura a data de atualização
        });
    }

    // Gerar código de convite único
    static async createCodigoConvite(): Promise<number> {
        let codigoConvite: number;
        let codigoExiste: Viagem | null;

        do {
            // Gerar um novo código de convite
            codigoConvite = Math.floor(100000 + Math.random() * 900000);

            // Verificar se o código de convite já existe na tabela
            codigoExiste = await Viagem.findOne({
                where: { codigoConvite },
            });
        } while (codigoExiste); // Repetir até encontrar um código único

        return codigoConvite;
    }

    // Atualizar viagem
    static async updateViagem(id: number, data: Partial<Omit<ViagemAttributes, 'id' | 'codigoConvite' | 'status' | 'dataCriacao' | 'dataAtualizacao'>>): Promise<ViagemAttributes> {
        // Verificar se a viagem existe
        const viagem = await Viagem.findByPk(id);
        if (!viagem) {
            throw new NotFoundError('Viagem não encontrada.');
        }

        const updated = await viagem.update({
            ...data,
            dataAtualizacao: new Date(),
        });

        // 2) Preparar notificação
        const changedFields = Object.keys(data);
        if (changedFields.length > 0) {
            // 3) Pegar todos os participantes/organizadores
            const solicitacoes = await Solicitacao.findAll({
                where: { idViagem: id, inseridoNaViagem: 1 },
            });
            const userIds = Array.from(
                new Set(solicitacoes.map((s) => s.idUsuario))
            );

            // 4) Disparar notificação para cada
            const msg = `A viagem ${viagem.nome} foi atualizada`;
            await Promise.all(
                userIds.map((userId) =>
                    criarNotificacao({
                        userId,
                        viagemId: id,
                        tipo: "viagem_atualizada",
                        mensagem: msg,
                    })
                )
            );
        }

        return updated;
    }

    // Deletar viagem
    public static async deleteViagem(id: number): Promise<{ message: string }> {
        const viagem = await Viagem.findByPk(id);

        if (!viagem) {
            throw new NotFoundError('Viagem não encontrada.');
        }

        await Orcamento.destroy({ where: { viagemId: id } });
        await Transporte.destroy({ where: { viagemId: id } });
        await Itinerario.destroy({ where: { viagemId: id } });
        await Localizacao.destroy({ where: { idViagem: id } });

        await UsuarioViagem.update(
            { status: 0, dataAtualizacao: new Date() },
            { where: { idViagem: id } }
        );

        //alterar o status para 0, marcando como desativado
        viagem.status = 0;
        viagem.dataAtualizacao = new Date();


        //salvar as alterações
        await viagem.save();
        return { message: 'Viagem desativada com sucesso!' };
    }
}