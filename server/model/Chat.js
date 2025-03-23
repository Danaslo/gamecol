const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./Usuario');

const Chat = sequelize.define('Chat',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario1: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_usuario2: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_envio: {
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'chats'
});

module.exports = Chat;