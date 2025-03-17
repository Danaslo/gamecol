const Usuario = require('./Usuario');
const Coleccion = require('./Coleccion');
const Juego = require('./Juego');
const Intercambio = require('./Intercambio');
const Chat = require('./Chat');
const { isModuleNamespaceObject } = require('util/types');

Chat.belongsTo(Usuario, { as: 'Usuario1', foreignKey: 'id_usuario1' });
Chat.belongsTo(Usuario, { as: 'Usuario2', foreignKey: 'id_usuario2' });

Coleccion.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Coleccion.hasMany(Juego, { foreignKey: 'id_juego' });

Intercambio.hasOne(Juego, { foreignKey: 'id_juego' });
Intercambio.belongsTo(Usuario, { as: 'Comprador', foreignKey: 'id_comprador' });
Intercambio.belongsTo(Usuario, { as: 'Vendedor', foreignKey: 'id_vendedor' });

Juego.belongsTo(Coleccion, { foreignKey: 'id_coleccion' });

Usuario.hasMany(Intercambio, { as: 'Compras', foreignKey: 'id_comprador' });
Usuario.hasMany(Intercambio, { as: 'Ventas', foreignKey: 'id_vendedor' });
Usuario.hasOne(Coleccion, { foreignKey: 'id_usuario' });

Usuario.hasMany(Chat, { as: 'Usuario1', foreignKey: 'id_usuario1' });
Usuario.hasMany(Chat, { as: 'Usuario2', foreignKey: 'id_usuario2' });

module.exports = {
    Usuario,
    Coleccion,
    Juego,
    Intercambio,
    Chat
};