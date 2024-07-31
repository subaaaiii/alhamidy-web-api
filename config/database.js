import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DB_NAME,
  DB_DIALECT,
  DB_TIMEZONE,
} = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  dialect: DB_DIALECT,
  timezone: DB_TIMEZONE,
});

export default db;