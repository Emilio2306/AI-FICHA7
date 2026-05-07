const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gender = sequelize.define(
  'Genders',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'genders',
    timestamps: false,
  }
);

module.exports = Gender;
