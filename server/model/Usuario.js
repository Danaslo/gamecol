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
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'El email no sigue un formato válido'
      }
    }
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

//Validación para contraseña mayor de caracteres. Como estoy testeando prefiero no ponerlo aún.
/* validate: {
        len: {
            args: [6],
            msg: "La contraseña debe tener al menos 8 caracteres."
        }
    } */

module.exports = Usuario;