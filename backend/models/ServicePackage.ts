import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface ServicePackageAttributes {
  id: number
  name: string
  type: 'company' | 'sole-proprietorship'
  tier: 'basic' | 'standard' | 'premium'
  price: number
  currency: string
  duration: string
  features: string[]
  inclusions: string[]
  processingTime: string
  popular?: boolean
  description: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface ServicePackageCreationAttributes extends Optional<ServicePackageAttributes, 'id' | 'popular' | 'isActive' | 'createdAt' | 'updatedAt'> {}

class ServicePackage extends Model<ServicePackageAttributes, ServicePackageCreationAttributes> implements ServicePackageAttributes {
  public id!: number
  public name!: string
  public type!: 'company' | 'sole-proprietorship'
  public tier!: 'basic' | 'standard' | 'premium'
  public price!: number
  public currency!: string
  public duration!: string
  public features!: string[]
  public inclusions!: string[]
  public processingTime!: string
  public popular?: boolean
  public description!: string
  public isActive!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ServicePackage.init(
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
    type: {
      type: DataTypes.ENUM('company', 'sole-proprietorship'),
      allowNull: false,
    },
    tier: {
      type: DataTypes.ENUM('basic', 'standard', 'premium'),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: 'KES',
    },
    duration: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    inclusions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    processingTime: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    popular: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: 'service_packages',
    timestamps: true,
  }
)

export default ServicePackage
