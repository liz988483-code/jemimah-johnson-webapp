import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()
dotenv.config({ path: path.resolve(process.cwd(), '.env') })
dotenv.config({ path: path.resolve(process.cwd(), '../.env') })
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const detectedDialect = process.env.DB_DIALECT
  || (process.env.DATABASE_URL?.startsWith('postgres') ? 'postgres' : undefined)
  || (process.env.DB_PORT === '5432' ? 'postgres' : 'mysql')

const commonOptions = {
  dialect: detectedDialect as 'mysql' | 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
  dialectOptions: detectedDialect === 'postgres' && process.env.DB_SSL === 'true'
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : undefined
}

console.log('DATABASE_URL loaded:', process.env.DATABASE_URL ? 'yes' : 'no')
console.log('Database dialect:', detectedDialect)

export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, commonOptions)
  : new Sequelize(
      process.env.DB_NAME || 'jemimah_johnson',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '',
      {
        ...commonOptions,
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || (detectedDialect === 'postgres' ? 5432 : 3306),
      }
    )
