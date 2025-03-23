const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./Usuario');
const Juego = require('./Juego');

const Coleccion = sequelize.define('Coleccion',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_juego: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'colecciones'
});

module.exports = Coleccion;