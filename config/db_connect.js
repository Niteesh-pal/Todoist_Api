const Sequelize = require('sequelize');
const dbConfig = require('./db.config.js');
require('dotenv').config();

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  process.env.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialiect,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../Model/user.model.js')(sequelize, Sequelize);
db.project = require('../Model/Poject.js')(sequelize, Sequelize);
db.Task = require('../Model/Task.js')(sequelize, Sequelize);
db.Labels = require('../Model/Labels.js')(sequelize, Sequelize);
db.Comment = require('../Model/Comment.js')(sequelize, Sequelize);

db.User.hasMany(db.project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
db.project.belongsTo(db.User, {
  foreignKey: 'user_id',
});

db.project.hasMany(db.Task, {
  foreignKey: 'project_id',
  onDelete: 'CASCADE',
});
db.Task.belongsTo(db.project, {
  foreignKey: 'project_id',
});

db.project.hasMany(db.Comment, {
  foreignKey: 'project_id',
  onDelete: 'CASCADE',
});
db.Comment.belongsTo(db.project, {
  foreignKey: 'project_id',
});

db.Task.hasMany(db.Comment, {
  foreignKey: 'task_id',
  onDelete: 'CASCADE',
});
db.Comment.belongsTo(db.Task, {
  foreignKey: 'task_id',
});

module.exports = db;
