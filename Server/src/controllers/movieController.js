//==============
// IMPORTS
//==============
const Movie = require('../models/movie');
const Gender = require('../models/gender');

//==============
// CONTROLLERS
//==============

//==============
// READ
//==============
exports.getAllMovies = async (req, res) => {
    try {
        const moviesList = await Movie.findAll();
        console.log('All movies:', JSON.stringify(moviesList, null, 2));
        res.json(moviesList);
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
};

exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findByPk(id);
        if (movie) {
            res.json(movie);
        } else {
            console.log(`Movie with id ${id} not found.`);
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error(`Error fetching movie with id ${id}:`, error);
        res.status(500).json({ error: 'Error fetching movie' });
    }
};
exports.getMovieByGender = async (req, res) => {
    const { genderId } = req.params;
    try {
        const movies = await Movie.findAll({ where: { genderId:genderId } });
        res.json(movies);
    } catch (error) {
        console.error(`Error fetching movies for gender ${genderId}:`, error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
};