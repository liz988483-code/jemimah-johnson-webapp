import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'
import Registration from './Registration'

interface InquiryAttributes {
  id: number
  name: string
  email: string
  phone: string
  entityType: 'company' | 'sole-proprietorship'
  packageTier: 'basic' | 'standard' | 'premium'
  proposedName: string
  businessDescription: string
  urgency: 'low' | 'medium' | 'high'
  additionalInfo?: string
  status: 'pending' | 'contacted' | 'in-progress' | 'completed'
  createdAt: Date
  updatedAt: Date
  registrationId?: number
}

interface InquiryCreationAttributes extends Optional<
  InquiryAttributes,
  'id' | 'additionalInfo' | 'packageTier' | 'status' | 'createdAt' | 'updatedAt' | 'registrationId'
> {}

class Inquiry extends Model<InquiryAttributes, InquiryCreationAttributes> implements InquiryAttributes {
  public id!: number
  public name!: string
  public email!: string
  public phone!: string
  public entityType!: 'company' | 'sole-proprietorship'
  public packageTier!: 'basic' | 'standard' | 'premium'
  public proposedName!: string
  public businessDescription!: string
  public urgency!: 'low' | 'medium' | 'high'
  public additionalInfo?: string
  public status!: 'pending' | 'contacted' | 'in-progress' | 'completed'
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public registrationId?: number
}

Inquiry.init(
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
    entityType: {
      type: DataTypes.ENUM('company', 'sole-proprietorship'),
      allowNull: false,
    },
    packageTier: {
      type: DataTypes.ENUM('basic', 'standard', 'premium'),
      allowNull: false,
      defaultValue: 'basic',
    },
    proposedName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    businessDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    urgency: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      allowNull: false,
      defaultValue: 'medium',
    },
    additionalInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'contacted', 'in-progress', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    registrationId: {
      type: DataTypes.INTEGER.UNSIGNED,
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
    tableName: 'inquiries',
    timestamps: true,
  }
)

// Associations
Inquiry.hasOne(Registration, { foreignKey: 'inquiryId', as: 'registration' })
Registration.belongsTo(Inquiry, { foreignKey: 'inquiryId', as: 'inquiry' })

export default Inquiry