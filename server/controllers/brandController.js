const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
	//Добавить Бренд
	async create(req, res, next) {
		try {
			const { name } = req.body
			const brand = await Brand.create({ name })
			return res.json(brand)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
	//Получить все
	async getAll(req, res, next) {
		try {
			const brands = await Brand.findAll()
			return res.json(brands)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
	//Получить Один бренд
	async getOne(req, res, next) {
		try {
			const { id } = req.params
			const brand = await Brand.findOne({
				where: { id },
			})
			return res.json(brand)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
}

module.exports = new BrandController()
