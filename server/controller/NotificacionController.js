const Notificacion = require('../model/Notificacion');

const crearNotificacion = async (req, res) => {
    try {
        const { mensaje, usuarioId } = req.body;
        if (!mensaje || !usuarioId) {
            return res.status(400).json({ mensaje: 'Faltan datos' });
        }

        const notificacion = await Notificacion.create({ mensaje, usuarioId });
        res.status(201).json(notificacion);
    } catch (error) {
        console.error('Error al crear notificación:', error);
        res.status(500).json({ mensaje: 'Error al crear notificación' });
    }
};

const marcarLeida = async (req, res) => {
    try {
        const { id } = req.params;

        const notificacion = await Notificacion.findByPk(id);
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

//Orden: Sin leer primero y luego por fecha de creación:
const listarTodasOrdenadas = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const notificaciones = await Notificacion.findAll({
            where: { id_usuario },
            order: [
                ['leido', 'ASC'],
                ['createdAt', 'DESC'],
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