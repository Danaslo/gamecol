/*
 Intercambio tiene que realizar:
 -Quitar un juego de la colección de un usuario y añadirlo a la colección de otro, cambiando
 el estado del juego vendido a "no en venta". HECHO

 HAY QUE TESTEARLO TODO
*/
const Usuario = require('../model/Usuario');
const Coleccion = require('../model/Coleccion');
const Juego = require('../model/Juego');
const Intercambio = require('../model/Intercambio');

async function intercambiarJuego(req, res) {

    try {
        const { juegoId, telefono } = req.body;
        const userId = req.userId;

        const nuevoDuenio = await Usuario.findOne({ where: { telefono } });
        if (!nuevoDuenio) {
            return res.status(404).json({ message: 'Colección no encontrada' });
        }

        //Intercambio del juego: 
        console.log('Usuario de la pagina: ' + userId + ' Usuario comprador: ' + nuevoDuenio.id)

        const coleccionDestino = await Coleccion.findOne({ where: { id_usuario: nuevoDuenio.id } });
        if (!coleccionDestino) {
            return res.status(404).json({ message: 'Colección no encontrada' });
        }
        await Juego.update({ id_coleccion: coleccionDestino.id }, { where: { id: juegoId } });
        await Juego.update({ estado: 'no en venta' }, { where: { id: juegoId } });

        //Registro de la venta:
        const juego = await Juego.findOne({ where: { id: juegoId } });

        const intercambio = await Intercambio.create({
            id_juego: juegoId,
            id_comprador: nuevoDuenio.id,
            precio: juego.precio,
            id_vendedor: userId,
        });

        res.json({ message: 'Juego intercambiado con éxito' });
    } catch (error) {
        console.log(error.message);
    }
}

async function listarVentas(req, res) {
    try {
        const userId = req.userId;
        const ventas = await Intercambio.findAll({ where: { id_vendedor: userId },include: [
            {
              model: Juego
            },
            {
              model: Usuario,
              as: 'Comprador',
              attributes: ['telefono']
            }
          ],
          order: [['fecha_venta', 'DESC']]});
        res.json(ventas);
    } catch (error) {
        console.log('Error al listar ventas');
    }
}

async function borrarVenta(req,res){

}

module.exports = {
    intercambiarJuego,
    listarVentas,
    borrarVenta

};