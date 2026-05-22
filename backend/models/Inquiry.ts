import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config/database'  // ← CHANGED THIS LINE

class Inquiry extends Model {
  public id!: number
  public name!: string
  public email!: string
  public phone!: string
  public company!: string | null
  public message!: string | null
  public serviceType!: string
  public serviceName!: string
  public entityType!: string | null
  public packageTier!: string | null
  public proposedName!: string | null
  public businessDescription!: string | null
  public amount!: number | null
  public paymentStatus!: string
  public status!: string
  public urgency!: string
  public additionalInfo!: string | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Inquiry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'registration'
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Company Registration'
    },
    entityType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    packageTier: {
      type: DataTypes.STRING,
      allowNull: true
    },
    proposedName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    businessDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'new'
    },
    urgency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'medium'
    },
    additionalInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Inquiry',
    tableName: 'inquiries'
  }
)

export default Inquiry