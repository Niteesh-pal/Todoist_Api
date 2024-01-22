const { DataTypes } = require('sequelize');
const db = require('../config/db_connect');

const Comment = db.define(
  'Comment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    project_id: {
      type: DataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    },
    posted_At: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    attachment: {
      type: DataTypes.JSONB,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

db.sync({ alter: true });
module.exports = Comment;
