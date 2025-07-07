import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './Usuario';
import Viagem from './Viagem';

// Definindo a interface para o modelo
export interface FotoAttributes {
    id?: number;
    url: string;
    tipo: 'perfil' | 'capa_viagem';
    usuarioId?: number;
    viagemId?: number;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

// Definindo o modelo 'Foto'
class Foto extends Model<FotoAttributes> implements FotoAttributes {
    public id!: number;
    public url!: string;
    public tipo!: 'perfil' | 'capa_viagem';
    public usuarioId!: number;
    public viagemId!: number;
    public dataCriacao!: Date;
    public dataAtualizacao!: Date;
}

Foto.init(
    {
        id: {
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM('perfil', 'capa_viagem'),
            allowNull: false,
        },
        usuarioId: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            references: {
                model: Usuario,
                key: 'id',
            },
        },
        viagemId: {
            type: DataTypes.SMALLINT,
            allowNull: true,
            references: {
                model: Viagem,
                key: 'id',
            },
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
        tableName: 'fotos',
        modelName: 'Foto',
        timestamps: false,
        validate: {
            // Validação para garantir que apenas um dos IDs seja preenchido
            checkFotoAssociation() {
                if (this.tipo === 'perfil' && !this.usuarioId) {
                    throw new Error('Foto de perfil deve ter usuarioId');
                }
                if (this.tipo === 'capa_viagem' && !this.viagemId) {
                    throw new Error('Foto de capa deve ter viagemId');
                }
                if (this.usuarioId && this.viagemId) {
                    throw new Error('Foto não pode pertencer a usuário e viagem ao mesmo tempo');
                }
            }
        }
    }
);

export default Foto;