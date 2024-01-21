const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const db = require('../config/db_connect');

const Task = db.define(
  'Task',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    project_id: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },

    section_id: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },

    labels: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },

    parent_id: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },

    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 4,
      },
    },

    due: {
      type: DataTypes.STRING,
    },

    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    comment_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },

    creator_id: {
      type: DataTypes.STRING,
      defaultValue: null,
    },

    assignee_id: {
      type: DataTypes.STRING,
      defaultValue: null,
    },

    assigner_id: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);

db.sync({ alert: true });
module.exports = Task;
