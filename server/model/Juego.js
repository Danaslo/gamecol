const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Juego = sequelize.define('Juego',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plataforma: {
        type: DataTypes.STRING,
        allowNull: true
    },
    condicion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['precintado', 'usado']]
        }
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_coleccion: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['en venta', 'no en venta']]
        }
    },
    precio:{
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
            min: 0
        },
        defaultValue: 0
    },
    favorito: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    timestamps: false,
    tableName: 'juegos'
});

module.exports = Juego;