import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// 1️⃣ Definição dos atributos
interface NotificacaoAttributes {
  id: number;
  userId: number;
  viagemId?: number;
  tipo: string;
  mensagem: string;
  read: boolean;
  dataCriacao: Date;
}

// 2️⃣ Torna opcionais na criação: id, dataCriacao e (já é?) viagemId
type NotificacaoCreationAttributes = Optional<
  NotificacaoAttributes,
  'id' | 'dataCriacao' | 'viagemId'
>;

// 3️⃣ Classe do Model
class Notificacao
  extends Model<NotificacaoAttributes, NotificacaoCreationAttributes>
  implements NotificacaoAttributes {
  public id!: number;
  public userId!: number;
  public viagemId?: number;
  public tipo!: string;
  public mensagem!: string;
  public read!: boolean;
  public dataCriacao!: Date;
}

Notificacao.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    viagemId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dataCriacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'notificacoes',
    sequelize,
    timestamps: false,
  }
);

export default Notificacao;