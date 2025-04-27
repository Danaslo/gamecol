const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Notificacion = sequelize.define('Notificacion', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  mensaje: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  leido: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  id_usuario: {
    type: DataTypes.BIGINT,
    allowNull: false,
  }
}, {
  tableName: 'notificaciones',
  timestamps: false,
});

module.exports = Notificacion;