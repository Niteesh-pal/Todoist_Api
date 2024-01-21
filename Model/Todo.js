const sequelize = require('sequelize');
const db = require('../config/db_connect');

const todo = db.define('todo', {
  id: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  parent_id: {
    type: sequelize.STRING,
  },
  name: {
    type: sequelize.STRING,
  },
  color: {
    type: sequelize.STRING,
  },
  order: {
    type: sequelize.INTEGER,
  },
  comment_count: {
    type: sequelize.INTEGER,
  },
  is_shared: {
    type: sequelize.BOOLEAN,
  },
  is_favourite: {
    type: sequelize.BOOLEAN,
  },
  is_inbox_project: {
    type: sequelize.BOOLEAN,
  },
  is_team_inbox: {
    type: sequelize.BOOLEAN,
  },
  viewStyle: {
    type: sequelize.STRING,
  },
  url: {
    type: sequelize.STRING,
  },
});
db.sync();
module.exports = todo;
