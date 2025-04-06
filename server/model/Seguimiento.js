const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Seguimiento = sequelize.define('Seguimiento',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_juego: {
        type:DataTypes.BIGINT,
        allowNull: false
    },
    telefono_duenio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^\d{9}$/,
            msg: 'El teléfono debe tener un mínimo de 9 dígitos'
          }
        }
    }
},{
    timestamps: false,
    tableName: 'seguimiento'
});

module.exports = Seguimiento;