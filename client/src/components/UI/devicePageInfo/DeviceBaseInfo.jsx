import React, { useContext, useRef, useState } from 'react'
import style from './DeviceBaseInfo.module.css'
import { Link } from 'react-router-dom'
import { SHOP_ROUTE } from '../../../utils/consts'
import { Context } from '../../..'

const DeviceBaseInfo = ({ item, brand, type }) => {
	const { device } = useContext(Context)
	return (
		<div className={style.device__name}>
			<h2 className={style.device__title}>{item.name}</h2>
			<div className={style.device__rating__box}>
				<span className={style.device__descName}>Рейтинг товара:</span>
				<span className={style.device__rating}>{item.rating}/5</span>
			</div>
			<div className={style.device__redirect}>
				<span>Все товары Бренда</span>
				<Link
					to={SHOP_ROUTE}
					onClick={() => {
						device.setSelectedBrand(brand)
						device.setTargetPage(1)
						device.setSelectedType({})
					}}
				>
					{brand.name}
				</Link>
				<span>Другие</span>
				<Link
					to={SHOP_ROUTE}
					onClick={() => {
						device.setTargetPage(1)
						device.setSelectedType(type)
						device.setSelectedBrand({})
					}}
				>
					{type.name}
				</Link>
			</div>
		</div>
	)
}

export default DeviceBaseInfo
