import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  username: 'root',
  password: '',
  database: 'jemimah_johnson',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
})

export default sequelize