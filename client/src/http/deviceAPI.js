import { $authHost, $host } from './index'

//Создание Типа
export const createType = async type => {
	const { data } = await $authHost.post('api/type', type)
	return data
}

//Получение Типов
export const fetchTypes = async () => {
	const { data } = await $host.get('api/type')
	return data
}

//Получить Тип
export const fetchType = async id => {
	const { data } = await $host.get(`api/type/${id}`)
	return data
}

//Создание Бренда
export const createBrand = async brand => {
	const { data } = await $authHost.post('api/brand', brand)
	return data
}

//Получение Брендов
export const fetchBrands = async () => {
	const { data } = await $host.get('api/brand')
	return data
}

//Получить Бренд
export const fetchBrand = async id => {
	const { data } = await $host.get(`api/brand/${id}`)
	return data
}

//Создание девайса
export const createDevice = async device => {
	const { data } = await $authHost.post('api/device', device)
	return data
}

//Получить все девайсы
export const fetchDevices = async (typeId, brandId, page, limit) => {
	const { data } = await $host.get('api/device', {
		params: {
			typeId,
			brandId,
			page: page,
			limit,
		},
	})
	return data
}
//Получить Один девайс
export const fetchSoloDevice = async id => {
	const { data } = await $host.get(`api/device/${id}`)
	return data
}
//Удалить девайс
export const deleteDevice = async id => {
	const { data } = await $authHost.delete(`api/device/${id}`)
	return data
}
