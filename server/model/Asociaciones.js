const Usuario = require('./Usuario');
const Coleccion = require('./Coleccion');
const Juego = require('./Juego');
const Intercambio = require('./Intercambio');
const Chat = require('./Chat');
const Seguimiento = require('./Seguimiento');
const Notificacion = require('./Notificacion');

Chat.belongsTo(Usuario, { as: 'Usuario1', foreignKey: 'id_usuario1' });
Chat.belongsTo(Usuario, { as: 'Usuario2', foreignKey: 'id_usuario2' });

Coleccion.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Coleccion.hasMany(Juego, { foreignKey: 'id_coleccion' });

Intercambio.belongsTo(Juego, { foreignKey: 'id_juego', onDelete: 'CASCADE' });
Intercambio.belongsTo(Usuario, { as: 'Comprador', foreignKey: 'id_comprador' });
Intercambio.belongsTo(Usuario, { as: 'Vendedor', foreignKey: 'id_vendedor' });

Juego.belongsTo(Coleccion, { foreignKey: 'id_coleccion' });
Juego.hasMany(Intercambio, { foreignKey: 'id_juego', onDelete: 'CASCADE' });
Juego.hasMany(Seguimiento, { foreignKey: 'id_juego' });

Usuario.hasMany(Intercambio, { as: 'Compras', foreignKey: 'id_comprador', onDelete: 'CASCADE' });
Usuario.hasMany(Intercambio, { as: 'Ventas', foreignKey: 'id_vendedor', onDelete: 'CASCADE' });
Usuario.hasOne(Coleccion, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });

Usuario.hasMany(Chat, { as: 'Usuario1', foreignKey: 'id_usuario1', onDelete: 'CASCADE' });
Usuario.hasMany(Chat, { as: 'Usuario2', foreignKey: 'id_usuario2', onDelete: 'CASCADE' });

Seguimiento.belongsTo(Juego, { foreignKey: 'id_juego' });

Usuario.hasMany(Notificacion, { foreignKey: 'id_usuario' });
Notificacion.belongsTo(Usuario, { foreignKey: 'id_usuario' });


module.exports = {
    Usuario,
    Coleccion,
    Juego,
    Intercambio,
    Chat,
    Seguimiento,
    Notificacion
};