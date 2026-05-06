var Sequelize= require('sequelize');

const sequelize = new Sequelize('AI2', 'postgres', '132639', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

module.exports = sequelize;
