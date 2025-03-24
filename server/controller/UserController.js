/*Éste controller tiene que: 
- Loguear un usuario (devuelve un token)
- Registrar un usuario creando una colección con su ID y encriptando contraseña.
- Verificar el token

QUEDA PROBAR EL LOGIN Y VER SI DA UN TOKEN VÁLIDO.

*/
const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Coleccion = require('../model/Coleccion');

async function registro(req, res){
    try {
        const { nombreUsuario, email, password } = req.body;

        const existe = await Usuario.findOne({ where: { nombreUsuario } });
        if (existe) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        //Encriptación de la contraseña:
        const saltosEncriptacion = bcrypt.genSaltSync(10);
        const contraseniaHasheada = bcrypt.hashSync(password, saltosEncriptacion);     
        //Creación del usuario:
        const usuario = await Usuario.create({
            nombreUsuario: nombreUsuario,
            email: email,
            password: contraseniaHasheada,
            rol: 'user'
        });
        //Creación de la colección:
        const idUsuario = usuario.id;
        await Coleccion.create({ id_usuario: idUsuario, juegos: [] });

        res.json({ message: 'Usuario creado correctamente' });
    }
    catch (error){
        console.log(error.message);
    }  
}

//Verificación del token:
const verificarToken = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Fallo al autenticar el token' });
        }
        req.userId = decoded.id;
        req.userRol = decoded.rol;
        next();
    });
}

async function login (req,res){
    const { nombreUsuario, password } = req.body;
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const passwordValida = bcrypt.compareSync(password, usuario.password);
    if (!passwordValida) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.SECRET, {
        expiresIn: 864000
    });
    res.json({ token });
}

module.exports = {
    registro,
    login,
    verificarToken
}