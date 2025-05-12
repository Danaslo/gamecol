const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); 

const sequelize = new Sequelize({
  host: '172.18.0.2',  
  dialect: 'mysql',
  username: 'gamehoarder', 
  password: 'Wh@t@reYouSelling', 
  database: 'gamingcollections',
  logging: false  
});

module.exports = sequelize;