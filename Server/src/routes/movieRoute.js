const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const upload = require('../middlewares/uploadMiddleware');

router.get('/list', movieController.getAllMovies);
router.get('/get/:id', movieController.getMovieById);
router.get('/movies/gender/:genderId', movieController.getMovieByGender);
router.post('/create', upload.single('file'), movieController.createMovie);
router.put('/update/:id', upload.single('file'), movieController.updateMovie);
router.delete('/delete/:id', movieController.deleteMovie);
module.exports = router;