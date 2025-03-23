const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Intercambio = require('./Intercambio');
const Coleccion = require('./Coleccion');
const Chat = require('./Chat');

const Usuario = sequelize.define('Usuario',{
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['admin', 'user']]
    },
    defaultValue: 'user'
  }
},{
    timestamps: false,
    tableName: 'usuarios'
});

module.exports = Usuario;