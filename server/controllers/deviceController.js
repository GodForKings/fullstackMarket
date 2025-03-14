const { Device, DeviceInfo } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const { type } = require('os')
const { where } = require('sequelize')
const { off } = require('process')
const { error } = require('console')

class DeviceController {
	// Создать Девайс в БД
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId } = req.body
			let { info } = req.body
			const { img } = req.files
			let fileName = uuid.v4() + '.png'
			img.mv(path.resolve(__dirname, '..', 'static', fileName))

			const device = await Device.create({
				name,
				price,
				brandId,
				typeId,
				img: fileName,
			})

			if (info) {
				info = JSON.parse(info)
				if (Array.isArray(info)) {
					info.forEach(element => {
						DeviceInfo.create({
							title: element.title,
							description: element.description,
							deviceId: device.id,
						})
					})
				}
			}

			return res.json(device)
		} catch (error) {
			next(ApiError.internal(error.message))
		}
	}

	//Удалить устройство по id
	async deleteDevice(req, res, next) {
		try {
			const { id } = req.params
			const device = await Device.findOne({
				where: { id },
			})
			if (!device) return next(ApiError.badRequest(error.message))
			const imagePath = path.resolve(__dirname, '..', 'static', device.img)
			fs.unlink(imagePath, error => {
				if (error) return next(ApiError.badRequest(error.message))
			})
			//Удаляем из бд связанный массив характеристик по Id-устройства
			await DeviceInfo.destroy({
				where: { deviceId: id },
			})
			await Device.destroy({
				where: { id },
			})
			return res.json({ message: 'Устройство удалено' })
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	// Получить всё +?по типу +?по бренду
	async getAll(req, res, next) {
		try {
			let { brandId, typeId, page, limit } = req.query
			page = page || 1 // текущая страница
			limit = limit || 50 // лимит отображения на одной странице
			let offset = page * limit - limit
			let devices

			if (!brandId && !typeId) {
				devices = await Device.findAndCountAll({ limit, offset })
			}
			if (brandId && !typeId) {
				devices = await Device.findAndCountAll({
					where: { brandId },
					limit,
					offset,
				})
			}
			if (!brandId && typeId) {
				devices = await Device.findAndCountAll({
					where: { typeId },
					limit,
					offset,
				})
			}
			if (brandId && typeId) {
				devices = await Device.findAndCountAll({
					where: { typeId, brandId },
					limit,
					offset,
				})
			}
			return res.json(devices)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}

	// Получить Один по ID
	async getOne(req, res, next) {
		try {
			const { id } = req.params
			const device = await Device.findOne({
				where: { id },
				include: [{ model: DeviceInfo, as: 'info' }],
			})
			return res.json(device)
		} catch (error) {
			next(ApiError.badRequest(error.message))
		}
	}
}

module.exports = new DeviceController()
