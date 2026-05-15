const express = require('express');
const router = express.Router();
const genderController = require('../controllers/genderController');

router.get('/list', genderController.getAllGenders);
router.get('/get/:id', genderController.getGenderById);
router.post('/create', genderController.createGender);
router.put('/update/:id', genderController.updateGender);
router.delete('/delete/:id', genderController.deleteGender);

module.exports = router;