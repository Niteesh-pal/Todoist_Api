

module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define(
    'Project',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: 'charcoal',
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      comment_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      is_shared: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      is_favourite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_inbox_project: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_team_inbox: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      viewStyle: {
        type: DataTypes.STRING,
        defaultValue: 'list',
      },
      url: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      timestamps: false,
    }
  );

  return project
};
