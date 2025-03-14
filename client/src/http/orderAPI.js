import { $host, $authHost } from './index'

export const sendMessage = async (name, phone, message) => {
	const { data } = await $authHost.post('api/order', {
		name,
		phone,
		message,
	})
	return data
}
