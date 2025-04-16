import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';

// Definindo a interface para os atributos do modelo
export interface LocalizacaoAttributes {
    id?: number;
    idViagem: number;
    nome: string;
    enderecoPartida: string;
    enderecoChegada: string;
    dataPartida: Date;
    dataChegada: Date;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

// Definindo o modelo
class Localizacao extends Model<LocalizacaoAttributes> implements LocalizacaoAttributes {
    public id!: number;
    public idViagem!: number;
    public nome!: string;
    public enderecoPartida!: string;
    public enderecoChegada!: string;
    public dataPartida!: Date;
    public dataChegada!: Date;
    public dataCriacao!: Date;
    public dataAtualizacao!: Date;
}

// Inicializando o modelo
Localizacao.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
        },
        idViagem: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            references: {
                model: 'viagens',
                key: 'idViagem',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        enderecoPartida: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        enderecoChegada: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        dataPartida: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        dataChegada: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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
        tableName: 'localizacoes',
        timestamps: false, // Já estamos usando `dataCriacao` e `dataAtualizacao` manualmente
    }
);

export default Localizacao;