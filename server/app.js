const express = require('express');
const userRouter = require('./router/router');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = 80;
const sequelize = require('./config/sequelize');
const path = require('path');
const fs = require('fs'); //FIleSystem, para poder subir imágenes
require('./model/Asociaciones');

dotenv.config();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Aquí se mira si la carpeta Uploads existe, si no, se crea para que no haya problemas.
const uploadDir = path.join(__dirname, '../uploads'); 
console.log('Ruta en app.js:', uploadDir);
console.log('Ruta absoluta en app.js:', path.resolve(uploadDir));

console.log('Ruta absoluta:', path.resolve(uploadDir)); 
try {
    if (!fs.existsSync(uploadDir)) {
        console.log('Creando directorio:', uploadDir);
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (error) {
    console.error('Error al crear el directorio:', error);
}
app.use('/uploads', express.static(uploadDir));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Inicio de la conexión
/*
sequelize.authenticate()
    .then(() => {
        console.log(' Conexión a la base de datos exitosa.');
        return sequelize.sync({ alter: true }); 
    })
    .then(() => {
        console.log(' Tablas sincronizadas correctamente.');
    })
    .catch(err => {
        console.error(' No se pudo conectar a la base de datos o sincronizar tablas:', err);
    });
    */
app.use(userRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
  });