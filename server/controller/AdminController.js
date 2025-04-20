const Usuario = require('../model/Usuario');
const Coleccion = require('../model/Coleccion');
const Juego = require('../model/Juego');
const Intercambio = require('../model/Intercambio');
const Chat = require('../model/Chat');
const Seguimiento = require('../model/Seguimiento');

async function isAdmin(req, res) {
    try {
        const usuario = await Usuario.findByPk(req.userId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado', admin: false });
        }
        const isAdmin = await usuario.rol === 'admin';
        return res.json({ admin: isAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al verificar el rol de usuario', admin: false });
    }
}

async function getUsuarios(req, res) {
    try {
        const usuarios = await Usuario.findAll({
            where: {
                rol: 'user'
            }
        })
        if (!usuarios) {
            return res.status(404).json({ message: 'No se han encontrado usuarios' });
        }
        return res.json({ usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
}


async function borrarUsuario(req, res) {
    try {
        const { userId } = req.body;
        const usuario = await Usuario.findByPk(userId);

        if (!usuario)
            return res.json({ message: 'No se ha encontrado un usuario con esa id' });
        const coleccion = await Coleccion.findOne({ where: { id_usuario: userId } });
        if (coleccion) {
            await Juego.destroy({ where: { id_coleccion: coleccion.id } });
        }

        await Coleccion.destroy({ where: { id_usuario: userId } });

        await Intercambio.destroy({ where: { id_comprador: userId } });
        await Intercambio.destroy({ where: { id_vendedor: userId } });

        await Seguimiento.destroy({where: {id_usuario: userId}});


        await Chat.destroy({ where: { id_usuario1: userId } });
        await Chat.destroy({ where: { id_usuario2: userId } });

        const response = await Usuario.destroy({ where: { id: userId } });

        if (!response)
            return res.json({ message: 'No se ha logrado borrar el usuario' });

        res.json({ message: 'Usuario borrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al borrar el usuario' });
    }
}




module.exports = {
    isAdmin,
    getUsuarios,
    borrarUsuario
}