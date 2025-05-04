const Notificacion = require('../model/Notificacion');
const Usuario = require('../model/Usuario');

const crearNotificacion = async (mensaje) => {
    try {
        const usuarios = await Usuario.findAll();

        // Crear las notificaciones para cada usuario
        const notificaciones = await Promise.all(usuarios.map(async (usuario) => {
            return await Notificacion.create({
                mensaje,
                id_usuario: usuario.id,
            });
        }));
    } catch (error){
        console.error('Error al crear notificación:', error);
    }
};

const marcarLeida = async (req, res) => {
    try {
        const { notificationId } = req.body;
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

const borrarNotificacion = async (req, res) => {
    try {
        const { id } = req.params;
        const notificacion = await Notificacion.findByPk(id);
        if (!notificacion) {
            return res.status(404).json({ mensaje: 'Notificación no encontrada' });
        }
        
        await notificacion.destroy();
        res.status(200).json({ mensaje: 'Notificación eliminada', notificacion });
    } catch (error) {
        console.error('Error al borrar notificación', error);
        res.status(500).json({ mensaje: 'Error al borrar notificación' });
    }
};

const listarTodasOrdenadas = async (req, res) => {
    try {
        const id_usuario = req.userId;
        const notificaciones = await Notificacion.findAll({
            where: { id_usuario },
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
    borrarNotificacion
};