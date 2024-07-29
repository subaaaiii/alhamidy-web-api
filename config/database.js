import { Sequelize } from "sequelize";

const db = new Sequelize('ponpes-alhamidy', 'root', '',{
    host: "localhost",
    dialect: "mysql",
});

export default db;