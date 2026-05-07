const express = require('express');
const router = express.Router();

const genderController = require('../controllers/genderController');

router.get('/test', genderController.test);

module.exports = router;