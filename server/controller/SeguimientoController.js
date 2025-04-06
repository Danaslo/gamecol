const Usuario = require('../model/Usuario');
const Coleccion = require('../model/Coleccion');
const Juego = require('../model/Juego');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Seguimiento = require('../model/Seguimiento');

async function listarSeguimientos(){
    try {
        const idUsuario = req.userId;
        const juegos = await Seguimiento.findAll({
            where: { id_usuario: idUsuario },
            include: [
                {
                    model: Juego,
                    attributes: ['id', 'nombre', 'imagen']
                }
            ]
        });
    
        const baseUrl = 'http://172.18.1.3/uploads/';
        const juegosConImagenesCompletas = juegos.map(seguimiento => {
            const juego = seguimiento.Juego;         
            if (juego && juego.imagen) 
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
    listarSeguimientos
}