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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuraciones de seguridad:
//CORS:
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

//Helmet para protección XSS y cabeceras HTTP:
app.use(helmet());

//Morgan para logs de peticiones HTTP:

// Ruta de los logs
const logDir = path.join(__dirname, 'logs');

// Miramos si  el directorio logs existe, se crea si no es así.
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Creamos un flujo de escritura para el archivo de logs.
const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' } // a para append, añade al final sin borrar lo anterior.
);

// Usar morgan con el flujo configurado
app.use(morgan('combined', { stream: accessLogStream }));

// Limitador de peticiones para prevenir ataques DDoS
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // Se comprueba que no llegue a 500 peticiones cada 5 minutos.
    max: 1000, // Máximo de 100 peticiones por IP
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Demasiadas peticiones, inténtalo más tarde.'
});

app.use(limiter);

//Aquí se mira si la carpeta Uploads existe, si no, se crea para que no haya problemas.
const uploadDir = path.join(__dirname, '../uploads');

try {
    if (!fs.existsSync(uploadDir)) {
        console.log('Creando directorio:', uploadDir);
        fs.mkdirSync(uploadDir, { recursive: true });
    }
} catch (error) {
    console.error('Error al crear el directorio:', error);
}

app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  });

app.use('/uploads', express.static(uploadDir));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Inicio de la conexión
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

app.use(userRouter);

module.exports = app;