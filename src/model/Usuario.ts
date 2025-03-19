import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Definindo a interface para o modelo
interface UsuarioAttributes {
    id: number;
    nome: string;
    email: string;
    senha: string;
    tipo: string;
    status: number;
}

// Definindo o modelo `Usuario`
class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public tipo!: string;
    public status!: number;
}

Usuario.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM('admin', 'editor', 'usuario'),
            allowNull: false,
            defaultValue: 'usuario',
        },
        status: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        sequelize, // A instância do Sequelize para a conexão
        tableName: 'usuarios',
        modelName: 'Usuario',
        underscored: true, // Para usar o snake_case
        timestamps: false, // Desativar os timestamps
    }
);

export default Usuario;