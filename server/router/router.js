const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const coleccionController = require('../controller/ColeccionController');
const juegoController = require('../controller/JuegoController');
const contactoController = require('../controller/ContactoController');
const mercadoController = require('../controller/MercadoController');
const seguimientosController = require('../controller/SeguimientoController')

const verificarToken = require('../controller/UserController').verificarToken;

//Rutas de userController:
router.post("/registro", userController.registro); //FUNCIONA
router.post("/login", userController.login);

//Rutas de juegoController:
router.post("/editarNombre", verificarToken, juegoController.editarNombre);
router.post("/editarCondicion", verificarToken, juegoController.editarCondicion);
router.post("/editarDescripcion", verificarToken, juegoController.editarDescripcion);
router.post("/editarImagen", verificarToken, juegoController.editarImagen);
router.post("/editarPrecio", verificarToken, juegoController.editarPrecio);
router.post("/vender", verificarToken, juegoController.ponerEnVenta);
router.post("/quitarVenta",verificarToken,juegoController.quitarVenta);

//Rutas de coleccionController:
router.post("/agregarJuego", verificarToken, coleccionController.agregarJuego);
router.post("/borrarJuego", verificarToken, coleccionController.borrarJuego);
router.get("/listarJuegos", verificarToken, coleccionController.listarJuegos);
router.get("/listarVenta", verificarToken, coleccionController.listarVentas);
router.get("/deslistarVenta", verificarToken, coleccionController.listarSinVender);

//Rutas de mercadoController:
router.get("/listarEnVenta", verificarToken, mercadoController.listarJuegosEnVenta);
router.get("/listarPorParametro", verificarToken, mercadoController.listarPorParametro);

//Rutas de SeguimientosController:
router.get("/listarSeguimientos",verificarToken, seguimientosController.listarSeguimientos)



//ENdpoints para el envío de correos:
router.post("/contacto",contactoController.enviarCorreo); //Como un correo lo puede enviar cualquiera no se revisa el token.



module.exports = router;