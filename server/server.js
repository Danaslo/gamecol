const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const handleChatSocket = require('./sockets/socketIOController');
const { createChatUser } = require('./controller/UserController');
const jwt = require('jsonwebtoken');
const PORT = 80;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://172.18.1.3:4200',
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
    const decoded = jwt.verify(token, "Iba yo de peregrino");
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

server.listen(PORT, '0.0.0.0', async () => {
  console.log(`Servidor escuchando en http://0.0.0.0:${PORT}`);
  await createChatUser();
});
