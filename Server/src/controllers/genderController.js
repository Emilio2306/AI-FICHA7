const {Movie, Gender}=require('../models');
const genderController ={};

exports.test = async (req, res) => {
    try {
        const gendersList = await Gender.findAll();
        res.json(gendersList);
    } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
        res.status(500).json({ error: 'Erro ao buscar gêneros' });
    }
};

