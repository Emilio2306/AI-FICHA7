//==============
// IMPORTS
//==============
const Movie = require('../models/movie');
const Gender = require('../models/gender');

//==============
// CONTROLLERS
//==============

//==============
// READ
//==============
exports.getAllMovies = async (req, res) => {
    try {
        const moviesList = await Movie.findAll();
        console.log('All movies:', JSON.stringify(moviesList, null, 2));
        res.json(moviesList);
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        res.status(500).json({ error: 'Erro ao buscar filmes' });
    }
};

exports.getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findByPk(id);
        if (movie) {
            res.json(movie);
        } else {
            console.log(`Movie with id ${id} not found.`);
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error(`Error fetching movie with id ${id}:`, error);
        res.status(500).json({ error: 'Error fetching movie' });
    }
};
exports.getMovieByGender = async (req, res) => {
    const { genderId } = req.params;
    try {
        const movies = await Movie.findAll({ where: { genderId:genderId } });
        res.status(200).json(movies);
    } catch (error) {
        console.error(`Error fetching movies for gender ${genderId}:`, error);
        res.status(500).json({ error: 'Error fetching movies' });
    }
};
//==============
// CREATE
//==============
exports.createMovie = async (req, res) => {
    try{
        const { title, genderId, description } = req.body;
        const parsedGenderId = Number(genderId);
        if (!req.file) {
            return res.status(400).json({
                error: 'Image is required'
            });
        }
        if (!title || !parsedGenderId || !description) {
            return res.status(400).json({ error: 'Title, genderId, and description are required' });
        }
        if (typeof title !== 'string') {
        return res.status(400).json({
            error: 'Title must be a string'
        });
        }

        if (typeof description !== 'string') {
            return res.status(400).json({
                error: 'Description must be a string'
            });
        }
        
        if (isNaN(parsedGenderId)) {
            return res.status(400).json({
                error: 'genderId must be a number'
            });
        }
        const gender = await Gender.findByPk(parsedGenderId);
        if(!gender){
            return res.status(400).json({ error: 'Invalid genderId' });
        }
        const existingMovie = await Movie.findOne({
            where: { title }
        });

        if (existingMovie) {
            return res.status(400).json({
                error: 'A movie with this title already exists'
            });
        }
        const image=`/uploads/${req.file.filename}`;
        
            const newMovie = await Movie.create({
            title: title,
            genderId: parsedGenderId,
            description: description,
            image: image
        });
        res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Error creating movie' });
    }
};
//==============
// UPDATE
//==============
exports.updateMovie=async (req, res) => {
    const { id } = req.params;
    const { title, genderId, description } = req.body;
   // Validações opcionais (só valida o que veio)
    if (title && typeof title !== 'string') {
        return res.status(400).json({ error: 'Title must be a string' });
    }
    if (description && typeof description !== 'string') {
        return res.status(400).json({ error: 'Description must be a string' });
    }
    if (genderId && isNaN(genderId)) {
        return res.status(400).json({ error: 'genderId must be a number' });
    }

    try {
        const fieldsToUpdate = { };

        if (title) fieldsToUpdate.title = title;
        if (genderId) fieldsToUpdate.genderId = genderId;
        if (description) fieldsToUpdate.description = description;
        if (req.file) fieldsToUpdate.image = `/uploads/${req.file.filename}`;
        Movie.
        const [rowsUpdated] = await Movie.update(fieldsToUpdate, 
            { where: { id } }
        );
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie updated successfully' });

    } catch (error) {
        console.error(`Error updating movie with id ${id}:`, error);
        res.status(500).json({ error: 'Error updating movie' });
    }

};
//==============
// DELETE
//==============
exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const rowsDeleted = await Movie.destroy({ where: { id } });
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    }
    catch (error) {
        console.error(`Error deleting movie with id ${id}:`, error);
        res.status(500).json({ error: 'Error deleting movie' });
    }
};
