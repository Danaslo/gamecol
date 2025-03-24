const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Coleccion = sequelize.define('Coleccion',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    juegos: {
        type: DataTypes.JSON,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'colecciones'
});

module.exports = Coleccion;