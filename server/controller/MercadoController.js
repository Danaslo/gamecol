/*
    MercadoController tiene que:
    -Listar todos los juegos en venta que no sean del propio usuario: HECHO
    -Listar juegos según parámetros de búsqueda que vienen como parámetro. HECHO
*/

const Usuario = require('../model/Usuario');
const Coleccion = require('../model/Coleccion');
const Juego = require('../model/Juego');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const Seguimiento = require('../model/Seguimiento');

async function listarPorParametro(req, res) {
    try {
        const idUsuario = req.userId;

        const { nombre, plataforma, condicion, precioMin, precioMax } = req.query;
        console.log(`Nombre: ${req.query.nombre}
                Plataforma: ${req.query.plataforma} 
                Condicion: ${req.query.condicion} 
                PrecioMin:  ${req.query.precioMin}  
                PrecioMax:  ${req.query.precioMax}`
        );

        const where = {};

        if (nombre) {
            where.nombre = { [Op.like]: `%${nombre}%` };
        }

        if (plataforma) {
            where.plataforma = { [Op.like]: `%${plataforma}%` };
        }

        if (condicion) {
            where.condicion = condicion;
        }

        if (precioMin || precioMax) {
            where.precio = {};
            if (precioMin) where.precio[Op.gte] = parseFloat(precioMin);
            if (precioMax) where.precio[Op.lte] = parseFloat(precioMax);
        }

        where.estado = 'en venta';

        const coleccion = await Coleccion.findOne({ where: { id_usuario: idUsuario}});

        where.id_coleccion = { [Op.ne]: coleccion.id};

        const juegos = await Juego.findAll({ where });

        if (!juegos || juegos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron juegos.' });
        }

        const baseUrl = 'http://172.18.1.3/uploads/';
        const juegosConImagenesCompletas = juegos.map(juego => {
            juego.imagen = baseUrl + juego.imagen.replace('uploads/', '');
            return juego;
        });
        res.json({ juegos: juegosConImagenesCompletas });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al listar los juegos en venta' });
    }
}

//Recordar buscar la colección para no listar los que son del propio usuario:
async function listarJuegosEnVenta(req, res) {
    try {
        const idUsuario = req.userId;

        const coleccion = await Coleccion.findOne({ where: { id_usuario: idUsuario } });

        //He hecho un left join al usar required false para traerme todos los juegos.
        const juegos = await Juego.findAll({
            where: {
                estado: 'en venta',
                id_coleccion: { [Op.ne]: coleccion.id }
            },
            include: [{
                model: Seguimiento,
                as: 'seguimiento',
                required: false,
                where: {
                    id_usuario: idUsuario
                }
            }]
        });

        //Ahora se comprueba qué juegos no tienen seguimiento y se filtran.
        const juegosSinSeguimiento = juegos.filter(j => j.seguimiento.length === 0);

        //Y ahora se preparan con imágenes los juegos que no tienen seguimiento.
        const baseUrl = 'http://172.18.1.3/uploads/';
        const juegosConImagenesCompletas = juegosSinSeguimiento.map(juego => {
            juego.imagen = baseUrl + juego.imagen.replace('uploads/', '');
            return juego;
        });

        res.json({ juegos: juegosConImagenesCompletas });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al listar los juegos en venta' });
    }
}

module.exports = {
    listarJuegosEnVenta,
    listarPorParametro
}