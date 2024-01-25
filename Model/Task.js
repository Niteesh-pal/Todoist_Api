module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'Task',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      // project_id: {
      //   type: DataTypes.UUID,
      //   defaultValue: null,
      //   allowNull: false,
      // },

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
        type: DataTypes.JSONB,
        defaultValue: null,
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

  return Task;
};
