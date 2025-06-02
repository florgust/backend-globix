import { DataTypes, Model } from "sequelize";
import sequelize from '../config/database';

// Definindo a interface para os atributos do modelo
export interface LocalizacaoAttributes {
    id?: number;
    idViagem: number;
    nome: string;
    idaEnderecoPartida: string;
    idaEnderecoChegada: string;
    idaDataPartida: Date;
    idaDataChegada: Date;
    voltaEnderecoPartida: string;
    voltaEnderecoChegada: string;
    voltaDataPartida: Date;
    voltaDataChegada: Date;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

// Definindo o modelo
class Localizacao extends Model<LocalizacaoAttributes> implements LocalizacaoAttributes {
    public id!: number;
    public idViagem!: number;
    public nome!: string;
    public idaEnderecoPartida!: string;
    public idaEnderecoChegada!: string;
    public idaDataPartida!: Date;
    public idaDataChegada!: Date;
    public voltaEnderecoPartida!: string;
    public voltaEnderecoChegada!: string;
    public voltaDataPartida!: Date;
    public voltaDataChegada!: Date;
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
        idaEnderecoPartida: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        idaEnderecoChegada: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        idaDataPartida: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        idaDataChegada: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        voltaEnderecoPartida: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        voltaEnderecoChegada: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        voltaDataPartida: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        voltaDataChegada: {
            type: DataTypes.DATE,
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
