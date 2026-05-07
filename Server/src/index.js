const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const genderRoute=require('./routes/genderRoute');
const movieRoute=require('./routes/movieRoute');
    
const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/list-genders', genderRoute);

app.use('/health', (req, res) => {
    res.send('Api a funcionar!');
});



app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
