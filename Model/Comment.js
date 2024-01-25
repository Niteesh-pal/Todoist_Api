module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      // task_id: {
      //   type: DataTypes.UUID,
      //   defaultValue: null,
      //   allowNull: true,
      // },
      // project_id: {
      //   type: DataTypes.UUID,
      //   defaultValue: null,
      //   allowNull: true,
      //   field:"project_id"
      // },
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

  return Comment;
};
