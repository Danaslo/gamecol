const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');
const coleccionController = require('../controller/ColeccionController');
const juegoController = require('../controller/JuegoController');
const contactoController = require('../controller/ContactoController');
const mercadoController = require('../controller/MercadoController');
const seguimientosController = require('../controller/SeguimientoController')
const intercambioController = require('../controller/IntercambioController');
const adminController = require('../controller/AdminController');
const notificacionController = require('../controller/NotificacionController');
const chatController = require('../controller/MensajeController');
const verificarToken = require('../controller/UserController').verificarToken;

//Rutas de userController:
router.post("/registro", userController.registro); //FUNCIONA
router.post("/login", userController.login);
router.get("/getUser",verificarToken, userController.getUsuario);
router.get("/userName",verificarToken,userController.getUserName);

//Rutas de juegoController:
router.post("/quitarVenta",verificarToken,juegoController.quitarVenta);
router.post("/cambiarVenta",verificarToken,juegoController.cambiarVenta);

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
router.get("/listarSeguimientos",verificarToken, seguimientosController.listarSeguimientos);
router.post("/crearSeguimiento",verificarToken, seguimientosController.crearSeguimiento);
router.post("/borrarSeguimiento",verificarToken, seguimientosController.borrarSeguimiento);
router.get("/buscarSeguimiento", verificarToken, seguimientosController.buscarSeguimiento);

//Rutas de IntercambioController:
router.post("/vender",verificarToken, intercambioController.intercambiarJuego)
router.get("/ventas", verificarToken, intercambioController.listarVentas);

//Rutas de adminController:
router.get("/isAdmin",verificarToken,adminController.isAdmin);
router.get("/usuarios",verificarToken,adminController.getUsuarios);
router.delete("/borrarUsuario",verificarToken,adminController.borrarUsuario);

//Rutas de notificacionController:
router.post('/notificaciones', verificarToken,notificacionController.crearNotificacion);
router.post('/notificaciones/cambiarEstado', verificarToken, notificacionController.marcarLeida);
router.get('/notificaciones',verificarToken, notificacionController.listarTodasOrdenadas);
router.delete('/borrarNotificacion/:id', verificarToken, notificacionController.borrarNotificacion);

//ENdpoints del chat
router.get('/chat/mensajesGeneral', verificarToken, chatController.obtenerMensajesGenerales);
router.post('/chat/mensaje', chatController.guardarMensaje);

//ENdpoint para el envío de correos:
router.post("/contacto",contactoController.enviarCorreo); //Como un correo lo puede enviar cualquiera no se revisa el token.

//Endpoint para el socket de IO:
router.get('/historial',verificarToken, async (req, res) => {
    const { usuario1, usuario2 } = req.query;
  
    const historial = await Chat.findAll({
      where: {
        [Op.or]: [
          { id_usuario1: usuario1, id_usuario2: usuario2 },
          { id_usuario1: usuario2, id_usuario2: usuario1 }
        ]
      },
      order: [['fecha_envio', 'ASC']]
    });
    res.json(historial);
  });



module.exports = router;