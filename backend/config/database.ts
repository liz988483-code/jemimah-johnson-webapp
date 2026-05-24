import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });

console.log("DATABASE_URL loaded:", process.env.DATABASE_URL ? "✅ YES" : "❌ NO");

export const sequelize = new Sequelize(
  process.env.DATABASE_URL || "",
  {
    dialect: "postgres",
    
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      },
      connectTimeout: 10000,
    },

    logging: false,
    
    pool: {
      max: 3,
      min: 1,
      idle: 20000,
      acquire: 20000,
    }
  }
);