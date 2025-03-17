const express = require('express');
const userRouter = require('./router/router');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/sequelize');
require('./model/Asociaciones');

dotenv.config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Para configurar EJS:
app.set('view engine', 'ejs');
app.set('views', './views');

//Inicio de la conexión
sequelize.authenticate()
    .then(() => {
        console.log(' Conexión a la base de datos exitosa.');
        return sequelize.sync({ force: true }); 
    })
    .then(() => {
        console.log(' Tablas sincronizadas correctamente.');
    })
    .catch(err => {
        console.error(' No se pudo conectar a la base de datos o sincronizar tablas:', err);
    });


app.use(userRouter);
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});