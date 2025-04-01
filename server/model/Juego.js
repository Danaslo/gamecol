const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Juego = sequelize.define('Juego',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
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
    }
},{
    timestamps: false,
    tableName: 'juegos'
});

module.exports = Juego;