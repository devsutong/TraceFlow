const Sequelize = require("sequelize");

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const sequelize = new Sequelize(dbName, dbUser, dbPass,{
    host: dbHost,
    dialect: "mysql"
  });

console.log("Sequelize Initialized!")
module.exports = sequelize;