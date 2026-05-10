import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import bcrypt from 'bcryptjs'

interface ClientUserAttributes {
  id: number
  email: string
  password: string
  name: string
  phone?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface ClientUserCreationAttributes extends Optional<ClientUserAttributes, 'id' | 'phone' | 'isActive' | 'createdAt' | 'updatedAt'> {}

class ClientUser extends Model<ClientUserAttributes, ClientUserCreationAttributes> implements ClientUserAttributes {
  public id!: number
  public email!: string
  public password!: string
  public name!: string
  public phone?: string
  public isActive!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password)
  }
}

ClientUser.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    tableName: 'client_users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user: ClientUser) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
      beforeUpdate: async (user: ClientUser) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      },
    },
  }
)

export default ClientUser
