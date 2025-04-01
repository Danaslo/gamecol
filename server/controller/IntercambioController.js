/*
 Intercambio tiene que realizar:
 -Quitar un juego de la colección de un usuario y añadirlo a la colección de otro, cambiando
 el estado del juego vendido a "no en venta". HECHO

 HAY QUE TESTEARLO TODO
*/
const Usuario = require('../model/Usuario');
const Coleccion = require('../model/Coleccion');
const Juego = require('../model/Juego');

async function intercambiarJuego(req, res){
    try {
        const { idJuego, idUsuarioDestino } = req.body;
        const idUsuarioOrigen = req.userId;

        const coleccionOrigen = await Coleccion.findOne({ where: { idUsuario: idUsuarioOrigen } });
        if (!coleccionOrigen) {
            return res.status(404).json({ message: 'Colección no encontrada' });
        }

        const coleccionDestino = await Coleccion.findOne({ where: { idUsuario: idUsuarioDestino } });
        if (!coleccionDestino) {
            return res.status(404).json({ message: 'Colección no encontrada' });
        }

        const juegosOrigen = coleccionOrigen.juegos;
        const juegosDestino = coleccionDestino.juegos;

        const indexOrigen = juegosOrigen.indexOf(idJuego);
        if (indexOrigen > -1) {
            juegosOrigen.splice(indexOrigen, 1);
        }

        juegosDestino.push(idJuego);

        await Coleccion.update({ juegos: juegosOrigen }, { where: { idUsuario: idUsuarioOrigen } });
        await Coleccion.update({ juegos: juegosDestino }, { where: { idUsuario: idUsuarioDestino } });

        await Juego.update({ estado: 'no en venta' }, { where: { id: idJuego } });

        res.json({ message: 'Juego intercambiado con éxito' });
    }
    catch (error){
        console.log(error.message);
    }  
}

module.exports = {
    intercambiarJuego
};