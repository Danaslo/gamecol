const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./Usuario');
const Juego = require('./Juego');

const Intercambio = sequelize.define('Intercambio',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_juego: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_comprador: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_vendedor: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'intercambio'
});

module.exports = Intercambio;