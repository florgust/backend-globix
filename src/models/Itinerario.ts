import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Viagem from './Viagem'; // Importando o modelo Viagem para a relação

// Definindo a interface para o modelo Itinerario
export interface ItinerarioAttributes {
    id?: number;
    viagemId: number;
    tipoEvento: string;
    titulo: string;
    dataHora: Date;
    descricao?: string;
    dataCriacao?: Date;
    dataAtualizacao?: Date;
}

// Definindo o modelo 'Itinerario'
class Itinerario extends Model<ItinerarioAttributes> implements ItinerarioAttributes {
    public id!: number;
    public viagemId!: number;
    public tipoEvento!: string;
    public titulo!: string;
    public dataHora!: Date;
    public descricao?: string;
    public dataCriacao!: Date;
    public dataAtualizacao!: Date;
}

Itinerario.init(
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
            onDelete: 'CASCADE', // Exclui os itinerários associados se a viagem for excluída
        },
        tipoEvento: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        titulo: {
            type: new DataTypes.STRING(256),
            allowNull: false,
        },
        dataHora: {
            type: DataTypes.DATE,
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
        tableName: 'itinerarios', // O nome da tabela
        modelName: 'Itinerario', // O nome do modelo
        timestamps: false, // Desativar os timestamps automáticos do Sequelize
    }
);

// Definindo a associação com o modelo Viagem
Itinerario.belongsTo(Viagem, { foreignKey: 'viagemId', as: 'viagem' });
Viagem.hasMany(Itinerario, { foreignKey: 'viagemId', as: 'itinerarios' });

export default Itinerario;