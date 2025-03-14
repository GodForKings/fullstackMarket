const { Sequelize } = require('sequelize')
require('dotenv').config

module.exports = new Sequelize(
	process.env.DB_NAME, // ИМЯ БД
	process.env.DB_USER, // Юзер
	process.env.DB_PASSWORD, //Пароль юзера
	{
		dialect: 'postgres',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
	}
)
