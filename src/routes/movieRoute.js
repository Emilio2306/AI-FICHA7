const express = require('express');
const router = express.Router();

const movieController = require('../controller/movieController');
router.get('/test', movieController.test);
router.get('/save', (req, res) => {
    res.json({status: 'Filme salvo com sucesso!'});
});

module.exports = router;