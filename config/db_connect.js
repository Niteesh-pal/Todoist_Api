const Sequelize = require('sequelize');
const dbConfig = require('./db.config.js');

module.exports = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialiect,
});
