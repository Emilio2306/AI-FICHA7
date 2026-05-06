const express = require('express');
const genderRoute=require('./routes/genderRoute');
const movieRoute=require('./routes/movieRoute');
    
const app = express();
app.set('port', process.env.PORT || 3000);
const PORT = app.get('port');

app.use(express.json());
app.use('/list-genders', genderRoute);
app.use('/filmes', movieRoute);
app.use('/health', (req, res) => {
    res.send('Api a funcionar!');
});



app.listen(PORT, () => {
  console.log(`Servidor a correr na porta ${PORT}`);
});
