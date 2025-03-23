const express = require('express');
const userRouter = require('./router/router');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = 80;
const sequelize = require('./config/sequelize');
require('./model/Asociaciones');

dotenv.config();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Para configurar EJS:
app.set('view engine', 'ejs');
app.set('views', './views');

//Inicio de la conexión
sequelize.authenticate()
    .then(() => {
        console.log(' Conexión a la base de datos exitosa.');
        return sequelize.sync({ force: false }); 
    })
    .then(() => {
        console.log(' Tablas sincronizadas correctamente.');
    })
    .catch(err => {
        console.error(' No se pudo conectar a la base de datos o sincronizar tablas:', err);
    });
app.use(userRouter);
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
  });