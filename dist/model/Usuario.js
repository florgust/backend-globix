"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
// Definindo o modelo `Usuario`
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    id: {
        type: sequelize_1.DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    senha: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    tipo: {
        type: sequelize_1.DataTypes.ENUM('organizador', 'participante'),
        allowNull: false,
        defaultValue: 'participante',
    },
    status: {
        type: sequelize_1.DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
    },
    dataCriacao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW, // Define o valor padrão como a data e hora atuais
    },
    dataAtualizacao: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW, // Define o valor padrão como a data e hora atuais
    },
}, {
    sequelize: database_1.default, // A instância do Sequelize para a conexão
    tableName: 'usuarios',
    modelName: 'Usuario',
    //underscored: true, // Para usar o snake_case
    timestamps: false, // Desativar os timestamps automáticos do Sequelize
});
exports.default = Usuario;
