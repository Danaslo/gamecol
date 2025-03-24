/*ColecciónController tiene que:
- Agregar juego a la tabla con su id para meterlo como juego suyo. HECHO
- Borrar juego de la tabla con su id para quitarlo de la colección. HECHO
- Listar los juegos de la colección. HECHO

HAY QUE TESTEARLO TODO
*/

const Usuario = require('../model/Usuario');
const Coleccion = require('../model/Coleccion');

async function agregarJuego(req, res) {
    try {
        const { idJuego } = req.body; //Sacamos la id del juego de la petición
        const idUsuario = req.userId;  //Se saca la Id del usuario qeu se guardó antes con el verifyToken de turno

        // Se busca la colección. No debería de dar problemas porque se genera una automáticamente al registrarse.
        const coleccion = await Coleccion.findOne({ where: { id_usuario: idUsuario } });
        if (!coleccion) {
            return res.status(404).json({ message: 'Bóveda no encontrada' });
        }

        // Se mira por si acaso el juego existiera ya en la colección (no se si sirve de mucho pero por si acaso).
        if (coleccion.juegos.includes(idJuego)) {
            return res.status(400).json({ message: '¡El juego ya está en la colección, su alteza!' });
        }

        //Se añade el juego a la colección.
        coleccion.juegos.push(idJuego);

       
        await coleccion.save();  //Sin esto NO se actualiza la colección en la base de datos, así que ojito.

        res.json({ message: 'Su nuevo juego está listo para exhibirse' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Ha habido un problemilla al intentar añadir su nuevo juego a la colección' });
    }  
}

async function borrarJuego(req, res) {
    try {
        const { idJuego } = req.body;
        const idUsuario = req.userId;  //Volvemos a coger el userId del verifyToken

        // Buscamos la colección de turno.
        const coleccion = await Coleccion.findOne({ where: { id_usuario: idUsuario } });
        if (!coleccion) {
            return res.status(404).json({ message: 'Bóveda no encontrada' });
        }

        // Obtenemos el array de juegos
        const juegos = coleccion.juegos;
        const index = juegos.indexOf(idJuego);

        // Si el juego existe, se elimina del array
        if (index > -1) {
            juegos.splice(index, 1);
        } else {
            return res.status(404).json({ message: '¡Lo sentimos, no hemos encontrado éste juego en la bóveda!' });
        }

       
        coleccion.juegos = juegos; 
        await coleccion.save();  

        res.json({ message: '¡Juego destruido!' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Algo ha salido mal mientras intentábamos borrar el juego.' });
    }
}

async function listarJuegos(req, res) {
    try {
        const idUsuario = req.userId;

        const coleccion = await Coleccion.findOne({ where: { id_usuario: idUsuario } });
        if (!coleccion) {
            return res.status(404).json({ message: 'Bóveda no encontrada' });
        }

        res.json(coleccion.juegos);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error al listar los juegos de la colección' });
    }
}

//No sé si incorporaré buscador en la colección por ventas pero por si acaso lo dejo aquí.
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
    agregarJuego,
    borrarJuego,
    listarJuegos,
    listarVentas,
    listarSinVender
}