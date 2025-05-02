import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Viagem from './Viagem'; // Importando o modelo Viagem para a relação

// Definindo a interface para o modelo Transporte
export interface TransporteAttributes {
    id?: number;
    viagemId: number;
    tipoTransporte: string;
    descricao?: string;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
}

// Definindo o modelo 'Transporte'
class Transporte extends Model<TransporteAttributes> implements TransporteAttributes {
    public id!: number;
    public viagemId!: number;
    public tipoTransporte!: string;
    public descricao?: string;
    public dataCriacao!: Date;
    public dataAtualizacao!: Date;
}

Transporte.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
        },
        viagemId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: Viagem, // Relacionando com o modelo Viagem
                key: 'id',
            },
            onDelete: 'CASCADE', // Exclui os transportes associados se a viagem for excluída
        },
        tipoTransporte: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        descricao: {
            type: new DataTypes.TEXT,
            allowNull: true,
        },
        dataCriacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Define o valor padrão como a data/hora atual
        },
        dataAtualizacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, // Define o valor padrão como a data/hora atual
        },
    },
    {
        sequelize, // A instância do Sequelize para a conexão
        tableName: 'transportes', // O nome da tabela
        modelName: 'Transporte', // O nome do modelo
        timestamps: false, // Desativar os timestamps automáticos do Sequelize
    }
);

// Definindo a associação com o modelo Viagem
Transporte.belongsTo(Viagem, { foreignKey: 'viagemId', as: 'viagem' });
Viagem.hasMany(Transporte, { foreignKey: 'viagemId', as: 'transportes' });

export default Transporte;