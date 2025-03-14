const jwt = require('jsonwebtoken')

module.exports = function (role) {
	return function (req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}
		try {
			const token = req.headers.authorization.split(' ')[1] //тип_токена сам_токен
			if (!token) {
				return res.status(401).json({ message: 'Не авторизован' })
			}
			const decoder = jwt.verify(token, process.env.SECRET_KEY)
			if (decoder.role !== role) {
				return res.status(403).json({ message: 'У вас нет доступа' })
			}
			req.user = decoder
			next()
		} catch (error) {
			res.status(401).json({ message: 'Не авторизован' })
		}
	}
}
