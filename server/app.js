const express = require('express');
const userRouter = require('./router/router');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const sequelize = require('./config/sequelize');
const path = require('path');
const fs = require('fs'); //FIleSystem, para poder subir imágenes

//Middlewares para seguridad:
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

require('./model/Asociaciones');

dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuraciones de seguridad:
//CORS:
app.use(cors({
    origin: FRONTEND_URL || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

//Helmet para protección XSS y cabeceras HTTP:
app.use(helmet());

// Limitador de peticiones para prevenir ataques DDoS
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // Se comprueba que no llegue a 500 peticiones cada 5 minutos.
    max: 500, // Máximo de 200 peticiones por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Demasiadas peticiones, inténtalo más tarde.'
});

app.use(limiter);

app.use(userRouter);

module.exports = app;