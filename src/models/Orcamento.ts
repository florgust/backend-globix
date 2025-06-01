import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';

// Interface dos atributos do modelo
export interface OrcamentoAttributes {
    id?: number;
    viagemId: number;
    categoria: string;
    custo: number;
    observacao?: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

// Modelo Orcamento
class Orcamento extends Model<OrcamentoAttributes> implements OrcamentoAttributes {
    public id!: number;
    public viagemId!: number;
    public categoria!: string;
    public custo!: number;
    public observacao?: string;
    public dataCriacao!: Date;
    public dataAtualizacao!: Date;
}

// Inicialização do modelo
Orcamento.init(
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
                model: 'viagens',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        categoria: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        custo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        dataCriacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        dataAtualizacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'orcamentos',
        timestamps: false, // Usando dataCriacao e dataAtualizacao manualmente
    }
);

export default Orcamento;