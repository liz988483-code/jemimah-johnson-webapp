import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface RegistrationAttributes {
  id: number
  inquiryId: number
  crNumber?: string
  kraPin?: string
  ifmisNumber?: string
  nssfNumber?: string
  nhifNumber?: string
  businessRegistrationNumber?: string
  vatNumber?: string
  status: 'pending' | 'submitted' | 'processing' | 'approved' | 'rejected' | 'completed'
  submissionDate?: Date
  approvalDate?: Date
  notes?: string
  documents?: string[]
  createdAt: Date
  updatedAt: Date
}

interface RegistrationCreationAttributes extends Optional<
  RegistrationAttributes,
  'id' | 'crNumber' | 'kraPin' | 'ifmisNumber' | 'nssfNumber' | 'nhifNumber' |
  'businessRegistrationNumber' | 'vatNumber' | 'submissionDate' | 'approvalDate' |
  'notes' | 'documents' | 'status' | 'createdAt' | 'updatedAt'
> {}

class Registration extends Model<RegistrationAttributes, RegistrationCreationAttributes>
  implements RegistrationAttributes {

  public id!: number
  public inquiryId!: number
  public crNumber?: string
  public kraPin?: string
  public ifmisNumber?: string
  public nssfNumber?: string
  public nhifNumber?: string
  public businessRegistrationNumber?: string
  public vatNumber?: string
  public status!: 'pending' | 'submitted' | 'processing' | 'approved' | 'rejected' | 'completed'
  public submissionDate?: Date
  public approvalDate?: Date
  public notes?: string
  public documents?: string[]
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Registration.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    inquiryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
    },
    crNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    kraPin: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    ifmisNumber: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    nssfNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    nhifNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    businessRegistrationNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    vatNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'submitted', 'processing', 'approved', 'rejected', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    submissionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approvalDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    documents: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
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
    tableName: 'registrations',
    timestamps: true,
  }
)

export default Registration