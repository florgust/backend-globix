import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './Usuario';
import Viagem from './Viagem';

// Definição da interface para a relação entre Usuário e Viagem
export interface SolicitacaoAttributes {
    idViagem: number;
    idUsuario: number;
    papel: 'organizador' | 'participante' | 'organizadorPromovido';
    status: number;
    dataCriacao: Date;
    dataAtualizacao: Date;
}

// Definição do modelo 'Solicitacao'
class Solicitacao extends Model<SolicitacaoAttributes> implements SolicitacaoAttributes {
    public idViagem!: number;
    public idUsuario!: number;
    public papel!: 'organizador' | 'participante' | 'organizadorPromovido';
    public status!: number;
    public dataCriacao!: Date;
    public dataAtualizacao!: Date;
}

Solicitacao.init(
    {
        idViagem: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Viagem,
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        idUsuario: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Usuario,
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        papel: {
            type: DataTypes.ENUM('organizador', 'participante', 'organizadorPromovido'),
            allowNull: false,
            defaultValue: 'participante',
        },
        status: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 1, // 1 = Ativo, 0 = Inativo
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
        tableName: 'usuario_viagem',
        modelName: 'Solicitacao',
        timestamps: false,
    }
);

// Definição das associações
Usuario.hasMany(Solicitacao, { foreignKey: 'idUsuario' });
Viagem.hasMany(Solicitacao, { foreignKey: 'idViagem' });
Solicitacao.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Solicitacao.belongsTo(Viagem, { foreignKey: 'idViagem' });

export default Solicitacao;
