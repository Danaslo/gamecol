const Usuario = require('../model/Usuario');
const Coleccion = require('../model/Coleccion');
const Juego = require('../model/Juego');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(require.main?.path || __dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

//Función para agregar un juego
async function agregarJuego(req, res) {
    try {
        const { nombre, condicion, descripcion, precio, estado, plataforma } = req.body;
        const idUsuario = req.userId;
        const coleccion = await Coleccion.findOne({ where: { id_usuario: idUsuario } });

        if (!coleccion) {
            return res.status(404).json({ message: 'Bóveda no encontrada' });
        }
        const imagen = req.file
            ? path.join('uploads', req.file.filename) 
            : path.join('uploads', 'default.jpg'); 

        const juego = await Juego.create({
            nombre,
            condicion,
            plataforma,
            descripcion,
            imagen, 
            id_coleccion: coleccion.id,
            precio,
            estado
        });

        res.json({ message: 'Su nuevo juego está listo para exhibirse' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha habido un problema al intentar añadir su nuevo juego a la colección' });
    }
}

// Función para borrar un juego
async function borrarJuego(req, res) {
    try {
        const { idJuego } = req.body;
        const idUsuario = req.userId;

        const coleccion = await Coleccion.findOne({ where: { id_usuario: idUsuario } });
        if (!coleccion) {
            return res.status(404).json({ message: 'Bóveda no encontrada' });
        }

        const juego = await Juego.findOne({ where: { id: idJuego, id_coleccion: coleccion.id } });
        if (!juego) {
            return res.status(404).json({ message: 'Juego no encontrado en tu bóveda' });
        }

        await juego.destroy();
        res.json({ message: '¡Juego destruido!' });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Algo ha salido mal mientras intentábamos borrar el juego.' });
    }
}

// Función para listar juegos
async function listarJuegos(req, res) {
    try {
        const idUsuario = req.userId;

        const coleccion = await Coleccion.findOne({ where: { id_usuario: idUsuario } });
        if (!coleccion) {
            return res.status(404).json({ message: 'Bóveda no encontrada' });
        }

        const juegos = await Juego.findAll({ where: { id_coleccion: coleccion.id } });

        const baseUrl = 'http://172.18.1.3/uploads/'; 
        const juegosConImagenesCompletas = juegos.map(juego => {
            juego.imagen = baseUrl + juego.imagen.replace('uploads/', ''); 
            return juego;
        });

        res.json({ juegos: juegosConImagenesCompletas });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al listar los juegos de la colección' });
    }
}

async function listarVentas(req, res) {
    try {
        const coleccion = await Coleccion.findAll({
            where: {
                estado: 'en venta',
                id_usuario: req.userId
            }
        });

        if (coleccion.length === 0) {
            return res.status(404).json({ message: '¡No hay juegos en venta en su bóveda!' });
        }

        res.json(coleccion);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Algo ha salido mal mientras intentábamos listar sus juegos en venta.' });
    }
}

async function listarSinVender(req, res) {
    try {
        const coleccion = await Coleccion.findAll({
            where: {
                estado: 'no en venta',
                id_usuario: req.userId
            }
        });

        if (coleccion.length === 0) {
            return res.status(404).json({ message: 'No hay juegos que no estén en venta' });
        }

        res.json(coleccion);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Algo ha salido mal mientras intentábamos listar los juegos que no desea vender' });
    }
}

module.exports = {
    agregarJuego: [upload.single('imagen'), agregarJuego],
    borrarJuego,
    listarJuegos,
    listarVentas,
    listarSinVender
};
