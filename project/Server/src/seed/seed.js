const { faker } = require('@faker-js/faker');

const Movie = require('../models/movie');
const Gender = require('../models/gender');
const sequelize = require('../config/database');

const genders = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Romance',
  'Adventure',
  'Thriller'
];

const movies = [
  'Breaking Bad',
  'Game of Thrones',
  'Interstellar',
  'The Matrix',
  'Titanic',
  'Inception',
  'Stranger Things',
  'Avatar',
  'The Dark Knight',
  'The Walking Dead'
];

async function main() {
    // cria as tabelas
  await sequelize.sync({ force: true });

  console.log('Base de dados sincronizada!');
  // criar géneros
  for (const genderDescription of genders) {

    await Gender.create({
      description: genderDescription,
    });

  }

  // criar filmes
  for (const movieTitle of movies) {

    await Movie.create({
      title: movieTitle,
      description: faker.lorem.paragraph(),
      image: faker.image.url(),
      genderId: faker.number.int({ min: 1, max: genders.length }),
    });

  }

  console.log('Seed executado com sucesso!');
}

main();