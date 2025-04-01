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
    },precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    id_comprador: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_vendedor: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    confirmacion_vendedor: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    fechaVenta: {
        type: DataTypes.DATE,
        allowNull: false,
        validate:  {
            validate: {
                //Intentando validar la fecha de venta: No se permiten ventas futuras ni un mes menor a la fecha actual.
                //Aún no sé si usaré ésto o simplemente la fecha se recogerá la del momento del registro.
                isWithinRange(value) {
                    const hoy = new Date(); 
                    const haceUnMes = new Date();
                    haceUnMes.setMonth(haceUnMes.getMonth() - 1);
                    if (value > hoy) {
                        throw new Error("No se permiten ventas futuras.");
                    }
                    if (value < haceUnMes) {
                        throw new Error("El periodo de gracia máximo para registrar ventas es de un mes.");
                    }
                }
            }
        }
    }
},{
    timestamps: false,
    tableName: 'intercambio'
});

module.exports = Intercambio;