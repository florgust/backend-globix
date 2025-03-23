"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// Definindo o modelo
class Localizacao extends sequelize_1.Model {
}
// Inicializando o modelo
Localizacao.init({
    id: {
        type: sequelize_1.DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
    },
    idViagem: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
        references: {
            model: 'viagens',
            key: 'idViagem',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    nome: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    enderecoPartida: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    enderecoChegada: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    dataPartida: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    dataChegada: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    dataCriacao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    dataAtualizacao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: 'localizacoes',
    timestamps: false, // Já estamos usando `dataCriacao` e `dataAtualizacao` manualmente
});
exports.default = Localizacao;
