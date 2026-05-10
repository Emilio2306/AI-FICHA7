const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload = require('../middlewares/uploadMiddleware');

router.get('/list-movies', movieController.getAllMovies);
router.get('/movie/:id', movieController.getMovieById);
router.get('/movies/gender/:genderId', movieController.getMovieByGender);

router.post('/create-movie', upload.single('file'), movieController.createMovie);

module.exports = router;