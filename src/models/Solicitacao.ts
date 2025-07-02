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
export interface SolicitacaoViagemCard {
    id: number;
    nome: string;
    imagem: string;
    dataInicio: string;
    dataFim: string;
    codigoConvite: number;
    organizador: string;
    transporte: string;
    papel: string;
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
Usuario.hasMany(Solicitacao, { foreignKey: 'idUsuario', as: 'solicitacoes' });
Viagem.hasMany(Solicitacao, { foreignKey: 'idViagem', as: 'solicitacoes' });
Solicitacao.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
Solicitacao.belongsTo(Viagem, { foreignKey: 'idViagem', as: 'viagem' });

export default Solicitacao;
