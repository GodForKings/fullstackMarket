const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')

const generateJwt = (id, email, role) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
		expiresIn: '24h',
	})
}

class UserController {
	//Регистрация и проверка на валидность
	async registration(req, res, next) {
		const { email, password, role } = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Некорректный email или password'))
		}
		const candidate = await User.findOne({ where: { email } })
		if (candidate) {
			return next(
				ApiError.badRequest(
					'Пользователь с таким email уже существует в системе'
				)
			)
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({ email, role, password: hashPassword })
		const basket = await Basket.create({ userId: user.id })
		const token = generateJwt(user.id, user.email, user.role)
		return res.json({ token })
	}

	//Авторизация Пользователя
	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ where: { email } })
			if (!user) {
				return next(
					ApiError.internal(
						email ? `Пользователя ${email} не существует` : `Введите email`
					)
				)
			}
			let comparePassword = bcrypt.compareSync(password, user.password)
			if (!comparePassword) {
				return next(ApiError.internal(`Указан неверный password`))
			}
			const token = generateJwt(user.id, user.email, user.role)
			return res.json({ token })
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	async check(req, res, next) {
		try {
			const token = generateJwt(req.user.id, req.user.email, req.user.role)
			return res.json({ token })
		} catch (error) {
			return next(ApiError.internal(error.message))
		}
	}
}

module.exports = new UserController()
