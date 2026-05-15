const sequelize = require('../config/database');
const Movie = require('./movie');
const Gender = require('./gender');

//==============
// Movie - Gender 1-Many
//==============

Gender.hasMany(Movie, {
    foreignKey: 'genderId',
    as: 'Movies',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});
Movie.belongsTo(Gender, {
    foreignKey: 'genderId',
    as: 'Genders',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

module.exports = {
    sequelize,
    Movie,
    Gender
};
console.log('Models carregados:', Object.keys(module.exports).filter(k => k !== 'sequelize'));