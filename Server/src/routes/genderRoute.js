const express = require('express');
const router = express.Router();
const genderController = require('../controllers/genderController');

router.get('/list-genders', genderController.getAllGenders);
router.get('/gender/:id', genderController.getGenderById);
router.post('/create-gender', genderController.createGender);
router.put('/update-gender/:id', genderController.updateGender);
router.delete('/delete-gender/:id', genderController.deleteGender);

module.exports = router;