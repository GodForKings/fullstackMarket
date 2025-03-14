const ApiError = require('../error/ApiError')
const nodemailer = require('nodemailer')
require('dotenv').config()

// Создание транспортера
const transporter = nodemailer.createTransport({
	service: 'gmail', //сервис который используем
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
})

class OrderController {
	// Функция для отправки письма
	async sendEmail(req, res, next) {
		try {
			const { name, phone, message } = req.body
			const mailOptions = {
				from: process.env.EMAIL,
				to: process.env.EMAIL,
				subject: 'Запрос на обратный звонок',
				text: `Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`,
			}

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error.message)
				}
				res.status(200).send('Письмо отправлено: ' + info.response)
			})
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
}

module.exports = new OrderController()
