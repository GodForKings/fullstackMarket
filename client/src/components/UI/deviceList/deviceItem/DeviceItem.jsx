import React, { memo, useContext } from 'react'
import classes from './DeviceItem.module.css'
import { useNavigate } from 'react-router-dom'
import { DEVICE_ROUTE } from '../../../../utils/consts'
import MyButton from '../../button/MyButton'
import { Context } from '../../../..'

const DeviceItem = memo(({ device }) => {
	const { basket } = useContext(Context)
	const navigate = useNavigate()
	const altCard = [classes.item]
	switch (device.id % 4) {
		case 2:
			altCard.push(classes.card2)
			break
		case 3:
			altCard.push(classes.card3)
			break
		case 0:
			altCard.push(classes.card4)
			break
	}
	const bgImg = `url(${process.env.REACT_APP_API_URL}${device.img})`
	return (
		<div
			className={altCard.join(' ')}
			onClick={() => {
				navigate(`${DEVICE_ROUTE}/${device.id}`)
			}}
		>
			<div
				className={classes.card}
				style={{
					backgroundImage: bgImg,
				}}
			>
				<div className={classes.content__box}>
					<title className={classes.card__title}>{device.name}</title>
					<span className={classes.card__content}>{device.price}₽</span>
					<span className={classes.rating}>{device.rating}/5</span>
					<MyButton
						onClick={e => {
							e.stopPropagation()
							basket.setCart(device)
						}}
					>
						+
					</MyButton>
				</div>
			</div>
		</div>
	)
})

export default DeviceItem
