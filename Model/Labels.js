const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Labels = sequelize.define(
    'Label',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: 'charcoal',
        allowNull: true,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      is_favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamp: false,
    }
  );

  return Labels;
};
