const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const genderRoute=require('./routes/genderRoute');
const movieRoute=require('./routes/movieRoute');
const path = require('path');

const app = express();

const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/genders', genderRoute);
app.use('/movies', movieRoute);
app.use('/health', (req, res) => {
    res.send('Api a funcionar!');
});



app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
