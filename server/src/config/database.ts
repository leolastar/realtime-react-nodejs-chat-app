const { Sequelize } = require("sequelize");
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/postgres",
  {
    dialect: "postgres",
    logging: false,
    pool: { max: 10, min: 0, idle: 10000 },
  }
);
