import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface DocumentAttributes {
  id: number
  fileName: string
  originalName: string
  mimeType: string
  fileSize: number
  encryptedData: string
  iv: string
  hash: string
  uploadedBy: number
  uploadedByEmail: string
  entityType: 'inquiry' | 'registration' | 'client'
  entityId: number
  isDeleted: boolean
  deletedAt?: Date
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, 'id' | 'isDeleted'> {}

class Document extends Model<DocumentAttributes, DocumentCreationAttributes> implements DocumentAttributes {
  public id!: number
  public fileName!: string
  public originalName!: string
  public mimeType!: string
  public fileSize!: number
  public encryptedData!: string
  public iv!: string
  public hash!: string
  public uploadedBy!: number
  public uploadedByEmail!: string
  public entityType!: 'inquiry' | 'registration' | 'client'
  public entityId!: number
  public isDeleted!: boolean
  public deletedAt?: Date
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Document.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Generated filename for the encrypted file'
    },
    originalName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Original filename before encryption'
    },
    mimeType: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'MIME type of the file'
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: 'Size of the file in bytes'
    },
    encryptedData: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Encrypted file data (hex string)'
    },
    iv: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: 'Initialization vector used for encryption'
    },
    hash: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: 'SHA-256 hash of the original file for integrity verification'
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'ID of the user who uploaded the document'
    },
    uploadedByEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Email of the user who uploaded the document'
    },
    entityType: {
      type: DataTypes.ENUM('inquiry', 'registration', 'client'),
      allowNull: false,
      comment: 'Type of entity the document belongs to'
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'ID of the entity the document belongs to'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'Soft delete flag'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Date when the document was soft deleted'
    }
  },
  {
    sequelize,
    tableName: 'documents',
    timestamps: true,
    indexes: [
      {
        fields: ['uploadedBy']
      },
      {
        fields: ['entityType', 'entityId']
      },
      {
        fields: ['isDeleted']
      },
      {
        fields: ['hash']
      }
    ]
  }
)

export default Document
