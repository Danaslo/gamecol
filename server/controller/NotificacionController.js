const Notificacion = require('../model/Notificacion');
const Usuario = require('../model/Usuario');

const crearNotificacion = async (req, res) => {
    try {
        const { mensaje } = req.body;
        const usuarios = await Usuario.findAll();

        // Crear las notificaciones para cada usuario
        const notificaciones = await Promise.all(usuarios.map(async (usuario) => {
            return await Notificacion.create({
                mensaje,
                id_usuario: usuario.id,
            });
        }));

        res.status(201).json(notificaciones);
    } catch (error) {
        console.error('Error al crear notificación:', error);
        res.status(500).json({ mensaje: 'Error al crear notificación' });
    }
};

const marcarLeida = async (req, res) => {
    try {
        const { notificationId } = req.body;
        console.log(' ID DE LA NOTIFICACION' + notificationId);
        const notificacion = await Notificacion.findByPk(notificationId);
        if (!notificacion) {
            return res.status(404).json({ mensaje: 'Notificación no encontrada' });
        }
        notificacion.leido = true;
        await notificacion.save();
        res.status(200).json({ mensaje: 'Notificación marcada como leída', notificacion });
    } catch (error) {
        console.error('Error al marcar notificación como leída:', error);
        res.status(500).json({ mensaje: 'Error al actualizar notificación' });
    }
};

//Orden: Sin leer primero
const listarTodasOrdenadas = async (req, res) => {
    console.log( 'ENTRA A LISTAR NOTIFICACIONES');
    try {
        const id_usuario = req.userId;
        const notificaciones = await Notificacion.findAll({
            where: { id_usuario },
            order: [
                ['leido', 'ASC']
            ]
        });
        res.status(200).json(notificaciones);
    } catch (error) {
        console.error('Error al listar notificaciones:', error);
        res.status(500).json({ mensaje: 'Error al listar notificaciones' });
    }
};

module.exports = {
    crearNotificacion,
    marcarLeida,
    listarTodasOrdenadas,
};