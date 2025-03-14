import React, { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../..'
import classes from './DeleteDevice.module.css'
import Select from '../../select/Select'
import MyButton from '../../button/MyButton'
import { fetchDevices, deleteDevice } from '../../../../http/deviceAPI'

const DeleteDevice = observer(({ showKill, setShowKill }) => {
	const { device } = useContext(Context)
	const [targetDevice, setTargetDevice] = useState(false)
	const [title, setTitle] = useState(
		'Выберите устройства из списка для удаления'
	)

	const dropForm = () => {
		setShowKill()
		setTargetDevice(false)
		setTitle('Выберите устройства из списка для удаления')
	}

	const destroyed = () => {
		if (targetDevice)
			deleteDevice(targetDevice.id).then(data => {
				device.devices.filter(item => item.id !== targetDevice.id)
				dropForm()
			})
		else {
			setTitle('Выбран некорректный девайс')
		}
	}
	useEffect(() => {
		fetchDevices().then(data => device.setDevices(data.rows))
	}, [])

	const rootClasses = showKill
		? `${classes.deleteDevice} ${classes.active}`
		: `${classes.deleteDevice}`

	return (
		<div className={rootClasses}>
			<div className={classes.info}>
				<h3 className={classes.info__title}>{title}</h3>
				<Select
					props={device.devices}
					onChange={e => {
						setTargetDevice(
							device.devices.find(item => item.name === e.target.value)
						)
					}}
				>
					Девайсы
				</Select>
				<div className={classes.info__btn}>
					<MyButton onClick={destroyed}>удалить</MyButton>
					<MyButton onClick={dropForm}>закрыть</MyButton>
				</div>
			</div>
		</div>
	)
})

export default DeleteDevice
