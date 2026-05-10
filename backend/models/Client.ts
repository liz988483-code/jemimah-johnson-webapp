import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'

interface ClientAttributes {
  id: number
  name: string
  email: string
  phone: string
  company?: string
  services: string[]
  status: 'active' | 'inactive' | 'prospect'
  notes?: string
  createdAt: Date
  updatedAt: Date
}

interface ClientCreationAttributes extends Optional<ClientAttributes, 'id' | 'company' | 'notes' | 'status' | 'createdAt' | 'updatedAt'> {}

class Client extends Model<ClientAttributes, ClientCreationAttributes> implements ClientAttributes {
  public id!: number
  public name!: string
  public email!: string
  public phone!: string
  public company?: string
  public services!: string[]
  public status!: 'active' | 'inactive' | 'prospect'
  public notes?: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    services: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'prospect'),
      allowNull: false,
      defaultValue: 'prospect',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'clients',
    timestamps: true,
  }
)

export default Client
