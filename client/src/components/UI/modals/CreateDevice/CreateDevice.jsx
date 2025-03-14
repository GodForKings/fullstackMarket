import React, { useContext, useState, useEffect } from 'react'
import MyButton from '../../button/MyButton'
import classes from './CreateDevice.module.css'
import { Context } from '../../../..'
import Select from '../../select/Select'
import {
	fetchTypes,
	fetchBrands,
	createDevice,
} from '../../../../http/deviceAPI'
import { observer } from 'mobx-react-lite'
import Loader from '../../loader/Loader'

const CreateDevice = observer(({ showDevice, setShowDevice }) => {
	const { device } = useContext(Context)
	const [name, setName] = useState('') //состояние названия
	const [price, setPrice] = useState(0) //состояние цены
	const [file, setFile] = useState(null) //для файла
	const [info, setInfo] = useState([]) // состояние для доп характеристик
	const [loading, setLoading] = useState(true) // состояние отгрузки

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
		setLoading(false)
	}, [])
	const rootClasses = showDevice
		? [classes.createDevice, classes.active]
		: [classes.createDevice]

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }])
	}

	const loadFile = e => {
		setFile(e.target.files[0])
		console.log(e.target.files[0])
	}
	const removeInfo = number => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => (i.number === number ? { ...i, [key]: value } : i)))
	}

	const dropForm = () => {
		setName('')
		setPrice('')
		setFile(null)
		setInfo([])
		setShowDevice()
		device.setSelectedType({})
		device.setSelectedBrand({})
	}

	const checkProperty = (element, array) => {
		return array.includes(element)
	}

	const addDevice = () => {
		if (
			checkProperty(device.selectedBrand, device.brands) &&
			checkProperty(device.selectedType, device.types) &&
			file &&
			price > 1 &&
			name
		) {
			const formData = new FormData()
			formData.append('name', name)
			formData.append('price', `${price}`)
			formData.append('brandId', device.selectedBrand.id)
			formData.append('typeId', device.selectedType.id)
			formData.append('img', file)
			formData.append('info', JSON.stringify(info))
			setLoading(true)
			createDevice(formData)
				.then(data => {
					dropForm()
					setLoading(false)
				})
				.catch(error =>
					alert(
						`Возникла ошибка при добавлении устройства ${error.response.data.message}`
					)
				)
		} else {
			alert('Проверьте корректность входных данных')
		}
	}
	if (loading) return <Loader />
	return (
		<div className={rootClasses.join(' ')}>
			<div
				className={classes.createDevice__Content}
				onClick={e => e.stopPropagation()} // Отключаем всплытие события
			>
				<form className={classes.createDevice__form}>
					<h2 className={classes.createDevice__title}>
						Форма добавление устройства
					</h2>
					<Select
						props={device.types}
						onChange={e => {
							device.setSelectedType(
								device.types.find(type => type.name === e.target.value)
							)
						}}
					>
						Выберите ТИП
					</Select>
					<Select
						props={device.brands}
						onChange={e => {
							device.setSelectedBrand(
								device.brands.find(brand => brand.name === e.target.value)
							)
						}}
					>
						Выберите БРЕНД
					</Select>
					<input
						type='text'
						placeholder='Введите название устройства'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<input
						type='number'
						value={price}
						placeholder='Введите стоимость'
						step={500}
						onChange={e => setPrice(Number(e.target.value))}
					/>
					<input type='file' onChange={loadFile} />
					<MyButton
						onClick={e => {
							e.preventDefault()
							addInfo()
						}}
					>
						Добавить новое свойство
					</MyButton>
					{info.map(i => (
						<div key={i.number} className={classes.createDescription}>
							<div className={classes.desc__title}>
								<input
									type='text'
									placeholder='введите название свойства'
									value={i.title}
									onChange={e => changeInfo('title', e.target.value, i.number)}
								/>
							</div>
							<div className={classes.desc__info}>
								<input
									type='text'
									placeholder='введите описание свойства'
									value={i.description}
									onChange={e =>
										changeInfo('description', e.target.value, i.number)
									}
								/>
							</div>
							<MyButton
								onClick={() => {
									removeInfo(i.number)
								}}
							>
								Удалить
							</MyButton>
						</div>
					))}
				</form>

				<div className={classes.createDevice__bot}>
					<MyButton
						onClick={e => {
							e.preventDefault()
							addDevice()
						}}
					>
						добавить
					</MyButton>
					<MyButton onClick={dropForm}>закрыть</MyButton>
				</div>
			</div>
		</div>
	)
})
export default CreateDevice
