const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const model = require("./db.model");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    define: {
      timestamps: false
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.table = model(sequelize, Sequelize);

module.exports = db;
