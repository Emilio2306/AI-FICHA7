const sequelize = require('../config/database');
const Movie = require('./movie');
const Gender = require('./gender');

//==============
// Movie - Gender 1-1
//==============

Movie.belongsTo(Gender, { foreignKey: 'genderId', as : 'MovieGenders' });  
Gender.hasOne(Movie, { foreignKey: 'genderId', as : 'GenderMovie' });

module.exports = {
    sequelize,
    Movie,
    Gender
};
console.log('Models carregados:', Object.keys(module.exports).filter(k => k !== 'sequelize'));