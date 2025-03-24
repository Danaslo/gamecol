/*
JuegoController tiene que:
- Editar el nombre del juego. HECHO
- Editar la condición del juego. HECHO
- Editar la descripción del juego. HECHO
- Editar la imagen del juego. HECHO.
- Editar el precio del juego. HECHO
- Editar el estado del juego, se hará con una función "ListarVenta" y otra DeslistarVenta". HECHA

HAY QUE TESTEARLO TODO
*/

const Juego = require('../model/Juego');

async function editarNombre(req, res){
    try {
        const { id, nombre } = req.body;
        await Juego.update({ nombre }, { where: { id } });
        res.json({ message: 'Nombre editado' });
    }
    catch (error){
        console.log(error.message);
    }  
}

async function editarCondicion(req, res){
    try {
        const { id, condicion } = req.body;
        await Juego.update({ condicion }, { where: { id } });
        res.json({ message: 'Condición editada' });
    }
    catch (error){
        console.log(error.message);
    }  
}

async function editarDescripcion(req, res){
    try {
        const { id, descripcion } = req.body;
        await Juego.update({ descripcion }, { where: { id } });
        res.json({ message: 'Editado de descripcióno exitoso.' });
    }
    catch (error){
        console.log(error.message);
    }  
}

async function editarImagen(req, res){
    try {
        const { id, imagen } = req.body;
        await Juego.update({ imagen }, { where: { id } });
        res.json({ message: 'Imagen editada con éxito' });
    }
    catch (error){
        console.log(error.message);
    }  
}

async function editarPrecio(req,res){
    try {
        const { id, precio } = req.body;
        await Juego.update({ precio }, { where: { id } });
        res.json({ message: 'Precio editado con éxito' });
    }
    catch (error){
        console.log(error.message);
    }  
}

async function ponerEnVenta(req,res){
    try {
        const { id } = req.body;
        await Juego.update({ estado: 'en venta' }, { where: { id } });
        res.json({ message: 'Juego puesto en venta' });
    }
    catch (error){
        console.log(error.message);
    }  
}

async function quitarVenta(req,res){
    try {
        const { id } = req.body;
        await Juego.update({ estado: 'no en venta' }, { where: { id } });
        res.json({ message: 'Juego retirado de la venta' });
    }
    catch (error){
        console.log(error.message);
    }  
}

module.exports = {
    editarNombre,
    editarCondicion,
    editarDescripcion,
    editarImagen,
    editarPrecio,
    ponerEnVenta,
    quitarVenta
}