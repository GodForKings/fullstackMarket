import { makeAutoObservable } from 'mobx'

export default class BasketStore {
	constructor() {
		this._cart = [] // Массив объектов с id и количеством
		makeAutoObservable(this)
	}

	// action fnc
	setCart(device) {
		const existingDevice = this._cart.find(item => item.id === device.id)
		if (existingDevice) {
			// Если девайс уже есть в корзине, увеличиваем его количество
			existingDevice.quantity += 1
		} else {
			// Если девайс новый, добавляем его в корзину с количеством 1
			this._cart.push({ ...device, quantity: 1 })
		}
		localStorage.setItem('cart', JSON.stringify(this._cart))
	}

	deleteDeviceInCart(device) {
		this._cart = this._cart.filter(item => item.id !== device.id)
		localStorage.setItem('cart', JSON.stringify(this._cart))
	}

	incrementDevice(device) {
		const existingDevice = this._cart.find(item => item.id === device.id)
		if (existingDevice) {
			existingDevice.quantity += 1
		}
		localStorage.setItem('cart', JSON.stringify(this._cart))
	}

	decrementDevice(device) {
		const existingDevice = this._cart.find(item => item.id === device.id)
		if (existingDevice && existingDevice.quantity > 1) {
			existingDevice.quantity -= 1
		} else if (existingDevice && existingDevice.quantity === 1) {
			this.deleteDeviceInCart(device)
		}
		localStorage.setItem('cart', JSON.stringify(this._cart))
	}

	// Для отгрузки корзины из localStorage
	preLoading(devices) {
		if (Array.isArray(devices)) {
			this._cart = devices
		}
	}

	// computed fnc
	get cart() {
		return this._cart
	}

	get totalItems() {
		return this._cart.reduce((total, item) => total + item.quantity, 0)
	}
	// Итоговая стоимость всей корзины
	get finalPrice() {
		return this._cart.reduce(
			(total, element) => total + element.quantity * element.price,
			0
		)
	}
}
