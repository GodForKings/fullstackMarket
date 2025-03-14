require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

//Обработчик ошибок, необходимо регистрировать последним
app.use(errorHandler)

// app.get('/', (req, res) => {
// 	res.status(200).json({ message: 'Good worked!' })
// })

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => {
			console.log(`All it's good! Server work on port ${PORT}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
