const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); 

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
module.exports = sequelize;