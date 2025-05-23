const Usuario = require('../model/Usuario');
const Coleccion = require('../model/Coleccion');
const Juego = require('../model/Juego');
const Seguimiento = require('../model/Seguimiento');

async function listarSeguimientos(req, res) {
    try {
        const idUsuario = req.userId;
        const juegos = await Seguimiento.findAll({
            where: { id_usuario: idUsuario },
            include: [
                {
                    model: Juego,
                    attributes: ['id', 'nombre', 'imagen','precio','condicion','descripcion','estado']
                }
            ],
            attributes: ['telefono_duenio']
        });
        const baseUrl = 'http://172.18.1.3/uploads/';

        const juegosConImagenesCompletas = juegos.map(seguimiento => {
            const juego = seguimiento.Juego;

            const imagenCompleta = juego && juego.imagen? baseUrl + juego.imagen.replace('uploads/', ''): null;
            return {
                id: juego?.id || null,
                nombre: juego?.nombre || '',
                imagen: imagenCompleta,
                telefono_duenio: seguimiento.telefono_duenio,
                precio: juego?.precio || '',
                condicion: juego?.condicion || '',
                descripcion: juego?.descripcion || '',
                estado: juego?.estado || ''
            };
        });

        res.json({ juegos: juegosConImagenesCompletas });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al listar los juegos en seguimiento' });
    }
}

async function crearSeguimiento(req, res) {
    try {
        const idUsuario = req.userId;
        const { idJuego } = req.body;

        //Busco si el seguimiento ya existe:
        const seguimientoExiste = await Seguimiento.findOne({
            where: {
                id_usuario: idUsuario,
                id_juego: idJuego
            }
        });
        if (seguimientoExiste)
            return res.json({ message: 'El seguimiento que intenta registrar ya existe' });

        //Busco el juego asociado a la id pasada por parámetro.
        console.log('Id del juego: ' + idJuego);
        const juego = await Juego.findOne({
            where: {
                id: idJuego
            }
        });
        console.log('Juego: ' + juego);

        //Busco la colección asociada al juego.
        const coleccion = await Coleccion.findOne({
            where: {
                id: juego.id_coleccion
            }
        });

        //Finalmente, el teléfono del dueño de la colección: 
        const duenioJuego = await Usuario.findOne({
            where: {
                id: coleccion.id_usuario
            }
        })

        const telefonoDuenio = duenioJuego.telefono;

        const seguimiento = await Seguimiento.create({
            id_usuario: idUsuario,
            id_juego: idJuego,
            telefono_duenio: telefonoDuenio
        })

        res.json({ message: 'Juego añadido a seguimientos' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error al añadir el juego a seguimientos' });
    }
}

async function borrarSeguimiento(req, res) {
    try {
        const {idJuego} = req.body;
        const idUsuario = req.userId;
        await Seguimiento.destroy({
            where: {
                id_usuario: idUsuario,
                id_juego: idJuego
            }
        })
        res.json({ message: 'Seguimiento eliminado'})
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Error al eliminar el seguimiento' });
    }
}

async function buscarSeguimiento(req,res){
    const idUsuario = req.userId; 
    const { idJuego } = req.query;
    console.log("Ruta alcanzada: ", req.query.idJuego);

    if (!idJuego) {
        return res.status(400).json({ message: 'Falta el id del juego' });
    }

    try {
        const seguimiento = await Seguimiento.findOne({
            where: {
                id_usuario: idUsuario,
                id_Juego: idJuego
            }
        });
        if (!seguimiento) 
            return res.json({ ok: false });
        res.json({ ok: true });
    } catch (error) {
        console.error('Error al buscar el seguimiento', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}



module.exports = {
    listarSeguimientos,
    crearSeguimiento,
    borrarSeguimiento,
    buscarSeguimiento
}