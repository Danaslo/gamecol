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
  nombre_usuario: {
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
    validate: {
        is: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial'
    }
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['admin', 'user']]
    }
  },
  nombre_real : {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
    timestamps: false,
    tableName: 'usuarios'
});

module.exports = Usuario;