const  Chat  = require('../model/Chat');
const  Usuario = require('../model/Usuario');


// Obtener los últimos 20 mensajes del chat general
async function obtenerMensajesGenerales(req, res) {
    try {
        const mensajes = await Chat.findAll({
            where: { id_usuario2: 9999 },
            order: [['fecha_envio', 'DESC']],
            limit: 20,
            include: [
                {
                    model: Usuario,
                    as: 'Usuario1',
                    attributes: ['nombreUsuario']
                },
                {
                    model: Usuario,
                    as: 'Usuario2',  // Si hay Usuario2, también incluirlo
                    attributes: ['nombreUsuario']
                }
            ]
        });

        // Responder con los mensajes en orden cronológico
        res.json(mensajes.reverse());
    } catch (error) {
        console.error('Error al obtener mensajes generales:', error);
        res.status(500).json({ error: 'No se pudieron obtener los mensajes.' });
    }
}

// Guardar un nuevo mensaje y emitirlo a todos los clientes conectados
async function guardarMensaje(io, socket) {
    socket.on('mensaje', async (data) => {
        try {
          if (!data.mensaje) {
            return socket.emit('error', { message: 'Falta el mensaje' });
          }
          const nuevoMensaje = await Chat.create({
            id_usuario1: socket.userId,
            id_usuario2: data.id_usuario2 || 9999,
            mensaje: data.mensaje,
            fecha_envio: new Date()
          });
      
          const usuario1 = await Usuario.findByPk(socket.userId, { attributes: ['nombreUsuario'] });
          const usuario2 = nuevoMensaje.id_usuario2 !== 9999
            ? await Usuario.findByPk(nuevoMensaje.id_usuario2, { attributes: ['nombreUsuario'] })
            : { nombreUsuario: 'General' };
      
          io.emit('mensaje', {
            id: nuevoMensaje.id,
            id_usuario1: socket.userId,
            id_usuario2: nuevoMensaje.id_usuario2,
            mensaje: nuevoMensaje.mensaje,
            fecha_envio: nuevoMensaje.fecha_envio,
            nombre_usuario1: usuario1?.nombreUsuario,
            nombre_usuario2: usuario2?.nombreUsuario
          });
      
        } catch (error) {
          console.error('Error al guardar mensaje:', error);
          socket.emit('error', { message: 'Error al guardar mensaje' });
        }
      });   
}

module.exports = {
    obtenerMensajesGenerales,
    guardarMensaje
};
