import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Definindo a interface para o modelo
interface UsuarioAttributes {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    tipo: string;
    status: number;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

// Definindo o modelo `Usuario`
class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes {
    public id!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public tipo!: string;
    public status!: number;
    public dataCriacao!: Date;
    public dataAtualizacao!: Date;
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
            type: DataTypes.ENUM('organizador', 'participante'),
            allowNull: false,
            defaultValue: 'participante',
        },
        status: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1,
        },
        dataCriacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,  // Define o valor padrão como a data e hora atuais
        },
        dataAtualizacao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,  // Define o valor padrão como a data e hora atuais
        },
    },
    {
        sequelize, // A instância do Sequelize para a conexão
        tableName: 'usuarios',
        modelName: 'Usuario',
        //underscored: true, // Para usar o snake_case
        timestamps: false, // Desativar os timestamps automáticos do Sequelize
    }
);

export default Usuario;
