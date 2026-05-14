import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../config/database'

interface AuditLogAttributes {
  id: number
  userId?: number
  userEmail?: string
  userType: 'admin' | 'client' | 'system'
  action: 'view' | 'download' | 'upload' | 'delete' | 'update' | 'create'
  entityType: 'document' | 'inquiry' | 'registration' | 'client' | 'package'
  entityId?: number
  entityName?: string
  ipAddress?: string
  userAgent?: string
  details?: string
  timestamp: Date
}

interface AuditLogCreationAttributes extends Optional<AuditLogAttributes, 'id' | 'timestamp'> {}

class AuditLog extends Model<AuditLogAttributes, AuditLogCreationAttributes> implements AuditLogAttributes {
  public id!: number
  public userId?: number
  public userEmail?: string
  public userType!: 'admin' | 'client' | 'system'
  public action!: 'view' | 'download' | 'upload' | 'delete' | 'update' | 'create'
  public entityType!: 'document' | 'inquiry' | 'registration' | 'client' | 'package'
  public entityId?: number
  public entityName?: string
  public ipAddress?: string
  public userAgent?: string
  public details?: string
  public timestamp!: Date
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

AuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'ID of the user who performed the action'
    },
    userEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Email of the user who performed the action'
    },
    userType: {
      type: DataTypes.ENUM('admin', 'client', 'system'),
      allowNull: false,
      defaultValue: 'system',
      comment: 'Type of user who performed the action'
    },
    action: {
      type: DataTypes.ENUM('view', 'download', 'upload', 'delete', 'update', 'create'),
      allowNull: false,
      comment: 'Type of action performed'
    },
    entityType: {
      type: DataTypes.ENUM('document', 'inquiry', 'registration', 'client', 'package'),
      allowNull: false,
      comment: 'Type of entity the action was performed on'
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'ID of the entity the action was performed on'
    },
    entityName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'Name of the entity the action was performed on'
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: 'IP address of the user'
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'User agent string of the browser'
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Additional details about the action'
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'audit_logs',
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['userType']
      },
      {
        fields: ['entityType', 'entityId']
      },
      {
        fields: ['action']
      },
      {
        fields: ['timestamp']
      }
    ]
  }
)

export default AuditLog
