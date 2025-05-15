const Chat = require('../model/Chat');

module.exports = (io, socket) => {
  socket.on('mensaje', async (data) => {
    const { id_usuario2, mensaje } = data;

    try {
      const nuevoMensaje = await Chat.create({
        id_usuario1: socket.userId,
        id_usuario2,
        mensaje,
        fecha_envio: new Date()
      });

      io.emit('mensaje', nuevoMensaje);
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
};