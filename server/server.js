const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const handleChatSocket = require('./sockets/socketIOController');
const { createChatUser } = require('./controller/UserController');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT;
const server = http.createServer(app);
const sequelize = require('./config/sequelize');

const FRONTEND_URL = process.env.FRONTEND_URL;

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
});
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Token no proporcionado'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    console.error('Error al verificar token en socket:', err);
    return next(new Error('Token inválido'));
  }
});

io.on('connection', (socket) => {
  handleChatSocket(io, socket); 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');

    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente.');

    server.listen(PORT, '0.0.0.0', async () => {
      console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
      await createChatUser();
    });

  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
})();
