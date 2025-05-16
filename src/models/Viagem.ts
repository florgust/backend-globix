import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

//Definindo a interface para o modelo
export interface ViagemAttributes {
    id?: number;
    nome: string;
    descricao?: string;
    dataInicio: Date;
    dataFim: Date;
    criadorId: number;
    codigoConvite: number;
    status: number;
    dataCriacao: Date;
    dataAtualizacao: Date;
    tipo: string;
    quantidadeParticipante: number;
}

//Definindo o modelo 'Viagem'
class Viagem extends Model<ViagemAttributes> implements ViagemAttributes {
    public id!: number;
    public nome!: string;
    public descricao!: string;
    public dataInicio!: Date;
    public dataFim!: Date;
    public criadorId!: number;
    public codigoConvite!: number;
    public status!: number;
    public dataCriacao!: Date;
    public dataAtualizacao!: Date;
    public tipo!: string;
    public quantidadeParticipante!: number;
}

Viagem.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        descricao: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        dataInicio: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        dataFim: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        criadorId: {
            type: new DataTypes.SMALLINT,
            allowNull: false,
        },
        codigoConvite: {
            type: new DataTypes.SMALLINT,
            allowNull: false,
        },
        status: {
            type: new DataTypes.SMALLINT,
            allowNull: false,
        },
        tipo: {
            type: new DataTypes.STRING(50),
            allowNull: false,
        },
        quantidadeParticipante: {
            type: new DataTypes.SMALLINT,
            allowNull: true,
        },
        dataCriacao: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
        dataAtualizacao: {
            type: new DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize, // A instância do Sequelize para a conexão
        tableName: 'viagens', // O nome da tabela
        modelName: 'Viagem', // O nome do modelo
        //underscored: true, // Para usar o snake_case
        timestamps: false, // Desativar os timestamps automáticos do Sequelize
    }
);

export default Viagem;