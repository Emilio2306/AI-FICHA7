const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');
router.get('/list-movies', movieController.getAllMovies);
router.get('/movie/:id', movieController.getMovieById);
router.get('/movies/gender/:genderId', movieController.getMovieByGender);

router.post('/create-movie', movieController.createMovie);

module.exports = router;