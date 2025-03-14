import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
	constructor() {
		this._types = [] //Типы предметов
		this._brands = [] //Бренды предметов
		this._devices = [] //Все девайсы
		this._selectedType = {} //Выбранный Тип
		this._selectedBrand = {} // Выбранный Бренд
		this._targetPage = 1 //Текущая страница
		this._totalCount = 0 //Количество товаров по запросу
		this._limit = 6 //Количество товаров на одной странице
		makeAutoObservable(this)
	}
	//action
	setTypes(types) {
		this._types = types
	}

	setBrands(brands) {
		this._brands = brands
	}

	setDevices(devices) {
		this._devices = devices
	}

	setSelectedType(type) {
		this._selectedType = type
	}

	setSelectedBrand(brand) {
		this._selectedBrand = brand
	}

	setTargetPage(targetPage) {
		this._targetPage = targetPage
	}

	setTotalCount(totalCount) {
		this._totalCount = totalCount
	}

	setLimit(limit) {
		this._limit = limit
	}

	//computed
	get types() {
		return this._types
	}

	get brands() {
		return this._brands
	}

	get devices() {
		return this._devices
	}

	get selectedType() {
		return this._selectedType
	}

	get selectedBrand() {
		return this._selectedBrand
	}

	get targetPage() {
		return this._targetPage
	}

	get totalCount() {
		return this._totalCount
	}

	get limit() {
		return this._limit
	}
}
