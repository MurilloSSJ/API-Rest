//Importando o sequelize
const sequelize = require('sequelize')
//Conectando ao MySQL
const DB = new sequelize ('API_games','root','',{host:'localhost',dialect:'mysql'})
//Criando o model de games
const games = DB.define('games',{
    title: sequelize.STRING,
    year: sequelize.INTEGER,
    price: sequelize.FLOAT
})
const users = DB.define('users',{
    name: sequelize.STRING,
    email: sequelize.STRING,
    password: sequelize.STRING
})
module.exports = {DB,games,users}