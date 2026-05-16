//==============
// IMPORTS
//==============
const { Gender, Movie } = require('../models');
const { ForeignKeyConstraintError } = require('sequelize');

//==============
// READ ALL
//==============
exports.getAllGenders = async (req, res) => {
    try {
        const gendersList = await Gender.findAll();
        res.json(gendersList);
    } catch (error) {
        console.error('Erro ao buscar géneros:', error);
        res.status(500).json({ error: 'Erro ao buscar géneros' });
    }
};

//==============
// READ BY ID
//==============
exports.getGenderById = async (req, res) => {
    const { id } = req.params;
    try {
        const gender = await Gender.findByPk(id);
        if (gender) {
            res.json(gender);
        } else {
            res.status(404).json({ error: 'Género não encontrado' });
        }
    } catch (error) {
        console.error(`Erro ao buscar género com id ${id}:`, error);
        res.status(500).json({ error: 'Erro ao buscar género' });
    }
};

//==============
// CREATE
//==============
exports.createGender = async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'A descrição é obrigatória' });
    }
    if (typeof description !== 'string') {
        return res.status(400).json({ error: 'A descrição deve ser texto' });
    }

    try {
        const existing = await Gender.findOne({ where: { description } });
        if (existing) {
            return res.status(400).json({ error: 'Este género já existe' });
        }

        const newGender = await Gender.create({ description });
        res.status(201).json(newGender);
    } catch (error) {
        console.error('Erro ao criar género:', error);
        res.status(500).json({ error: 'Erro ao criar género' });
    }
};

//==============
// UPDATE
//==============
exports.updateGender = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'A descrição é obrigatória' });
    }

    try {
        const [rowsUpdated] = await Gender.update(
            { description },
            { where: { id } }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Género não encontrado' });
        }

        res.json({ message: 'Género atualizado com sucesso' });
    } catch (error) {
        console.error(`Erro ao atualizar género com id ${id}:`, error);
        res.status(500).json({ error: 'Erro ao atualizar género' });
    }
};

//==============
// DELETE
//==============
exports.deleteGender = async (req, res) => {
    const { id } = req.params;
    try {
        const relatedMoviesCount = await Movie.count({ where: { genderId: id } });
        if (relatedMoviesCount > 0) {
            return res.status(409).json({
                error: 'Não é possível eliminar o género: existem filmes associados a este género'
            });
        }

        const rowsDeleted = await Gender.destroy({ where: { id } });

        if (rowsDeleted === 0) {
            return res.status(404).json({ error: 'Género não encontrado' });
        }

        res.json({ message: 'Género eliminado com sucesso' });
    } catch (error) {
        if (error instanceof ForeignKeyConstraintError) {
            return res.status(409).json({
                error: 'Não é possível eliminar o género: existem filmes associados a este género'
            });
        }
        console.error(`Erro ao eliminar género com id ${id}:`, error);
        res.status(500).json({ error: 'Erro ao eliminar género' });
    }
};