import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

export const sequelize = new Sequelize(
  process.env.DB_NAME || "jemimah_johnson",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",

    dialectOptions: {
      connectTimeout: 10000,
      ssl: false, // important for XAMPP
    },

    logging: false,
  }
);
