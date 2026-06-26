import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

// Load .env from the backend folder specifically
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("DATABASE_URL loaded:", process.env.DATABASE_URL ? "✅ YES" : "❌ NO");

export const sequelize = new Sequelize(
  process.env.DB_NAME || "jemimah_johnson",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000,
    }
  }
);