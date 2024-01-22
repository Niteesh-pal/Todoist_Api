const sequelize = require('sequelize');
const db = require('../config/db_connect');

const project = db.define(
  'Project',
  {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    parent_id: {
      type: sequelize.STRING,
      defaultValue: null,
      allowNull: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    color: {
      type: sequelize.STRING,
      defaultValue: 'charcoal',
    },
    order: {
      type: sequelize.INTEGER,
      defaultValue: 0,
    },
    comment_count: {
      type: sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    is_shared: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    is_favourite: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_inbox_project: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_team_inbox: {
      type: sequelize.BOOLEAN,
      defaultValue: false,
    },
    viewStyle: {
      type: sequelize.STRING,
      defaultValue: 'list',
    },
    url: {
      type: sequelize.STRING,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
db.sync();
module.exports = project;
