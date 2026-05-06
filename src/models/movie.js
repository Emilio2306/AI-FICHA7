const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movie = sequelize.define(
  'Movie',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true
    },
    genderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'movies',
    timestamps: false,
  }
);

module.exports = Movie;
