const express = require('express');
const router = express.Router();

const genderController = require('../controller/genderController');

router.get('/test', genderController.test);
router.get('/save', (req, res) => {
    res.json({status: 'Gênero salvo com sucesso!'});
});

module.exports = router;