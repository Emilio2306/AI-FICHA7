const sequelize = require('../config/database');
const Movie = require('./movie');
const Gender = require('./gender');

//==============
// Movie - Gender 1-Many
//==============

Gender.hasMany(Movie, { foreignKey: 'genderId', as : 'GenderMovie' });
Movie.belongsTo(Gender, { foreignKey: 'genderId', as : 'MovieGenders' });  

module.exports = {
    sequelize,
    Movie,
    Gender
};
console.log('Models carregados:', Object.keys(module.exports).filter(k => k !== 'sequelize'));