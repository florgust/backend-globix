"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
//Definindo o modelo 'Viagem'
class Viagem extends sequelize_1.Model {
}
Viagem.init({
    id: {
        type: sequelize_1.DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    descricao: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
    dataInicio: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dataFim: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    criadorId: {
        type: new sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
    },
    codigoConvite: {
        type: new sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
    },
    status: {
        type: new sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
    },
    dataCriacao: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    dataAtualizacao: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: database_1.default, // A instância do Sequelize para a conexão
    tableName: 'viagens', // O nome da tabela
    modelName: 'Viagem', // O nome do modelo
    //underscored: true, // Para usar o snake_case
    timestamps: false, // Desativar os timestamps automáticos do Sequelize
});
exports.default = Viagem;
