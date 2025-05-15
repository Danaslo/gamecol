/*Éste controller tiene que: 
- Loguear un usuario (devuelve un token) HECHO
- Registrar un usuario creando una colección con su ID y encriptando contraseña. HECHO
- Verificar el token HECHO
*/
const Usuario = require('../model/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Coleccion = require('../model/Coleccion');
const { Console } = require('console');

async function registro(req, res) {
    try {
        const { nombreUsuario, email, password, telefono } = req.body;

        const existe = await Usuario.findOne({ where: { nombreUsuario } });
        if (existe) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        //Encriptación de la contraseña:
        const contraseniaHasheada = passHash(password)
        //Creación del usuario:
        const usuario = await Usuario.create({
            nombreUsuario: nombreUsuario,
            email: email,
            password: contraseniaHasheada,
            rol: 'user',
            telefono: telefono
        });
        //Creación de la colección:
        const idUsuario = usuario.id;
        await Coleccion.create({ id_usuario: idUsuario, juegos: [] });

        res.json({ message: 'Usuario creado correctamente' });
    }
    catch (error) {
        console.log(error.message);
    }
}

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }
    jwt.verify(token, "Iba yo de peregrino", (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Fallo al autenticar el token' });
        }
        req.userId = decoded.id;
        req.userRol = decoded.rol;
        next();
    });
}

async function login(req, res) {
    const { nombreUsuario, password } = req.body;
    const usuario = await Usuario.findOne({ where: { nombreUsuario } });
    if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const passwordValida = bcrypt.compareSync(password, usuario.password);
    if (!passwordValida) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, "Iba yo de peregrino", {
        expiresIn: 864000
    });
    res.json({ token });
}

async function getUsuario(req, res) {
    const name = await Usuario.findOne({ where: { id: req.userId } });
    res.json(name);
}



async function getUserName(req, res) {
    try {
        const name = await Usuario.findOne({
            where: { id: req.userId },
            attributes: ['nombreUsuario']
        });
        res.json(name?.nombreUsuario);
    } catch (error) {
        console.error('Error al obtener el nombre de usuario:', error);
        res.status(500).json({ error: 'Error al obtener el nombre de usuario' });
    }
}



async function createChatUser(req, res) {
    const userList = await Usuario.findAll();
    if (!userList.some(u => u.id === 9999)) {
        const password = 'g4m3rl0v3sp0t4t03s'
        const contraseniaHasheada = passHash(password);
        await Usuario.create({
            id: 9999,
            nombreUsuario: 'GamerChatterCaver',
            email: "chatercaver@gamercave.com",
            password: contraseniaHasheada,
            telefono: '000000000'
        });
    }
}

async function editarContrasenia(req, res) {
    try {
        const { nuevaContrasenia } = req.body;
        console.log(nuevaContrasenia);
        const contraseniaHasheada = passHash(nuevaContrasenia);
        const usuario = await Usuario.findOne({ where: { id: req.userId } });
        if (!usuario)
            return res.status(404).json({ message: 'No se ha encontrado el usuario' }); 
        await Usuario.update({password: contraseniaHasheada}, {where: {id: req.userId}});
        return res.status(200).json({message: 'Contraseña cambiada con éxito'});
    } catch (error) {
        return res.status(500).json({ message: 'Error al editar contraseña' });
    }
}

function passHash(password) {
    const saltosEncriptacion = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, saltosEncriptacion);
}

async function editarCorreo(req,res){  
    console.log('ENTRA A EDITAR CORREO');
    try {
        const {newEmail} = req.body;
        console.log('EL CORREO ES: ' + newEmail);
        const email = await Usuario.findOne({where: {email: newEmail}})
        if(email)
            return res.status(409).json({message: "El correo ya está en uso"});
        await Usuario.update({email: newEmail}, {where: {id: req.userId}});
        res.status(200).json({message: 'Correo cambiado con éxito'});
    } catch (error) {
        res.status(500).json({message: 'Error al editar correo'});
    }
}

async function editarTelefono(req,res){
    try {
        const {newPhone} = req.body;
        const phone = await Usuario.findOne({where: {telefono: newPhone}});
        if(phone)
            return res.status(409).json({message: 'El teléfono ya está en uso'});
        Usuario.update({telefono: newPhone},{where: {id: req.userId}});
        res.status(200).json({message: 'Teléfono editado con éxito'});
    } catch (error) {
        
    }
}



module.exports = {
    registro,
    login,
    verificarToken,
    getUsuario,
    createChatUser,
    getUserName,
    editarContrasenia,
    editarCorreo,
    editarTelefono
}