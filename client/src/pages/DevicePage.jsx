import React, { useContext, useEffect, useState } from 'react'
import '../styles/devicePage.css'
import MyButton from '../components/UI/button/MyButton'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchBrand, fetchSoloDevice, fetchType } from '../http/deviceAPI'
import { Context } from '..'
import { observer } from 'mobx-react-lite'
import { BASKET_ROUTE, SHOP_ROUTE } from '../utils/consts'
import DeviceBaseInfo from '../components/UI/devicePageInfo/DeviceBaseInfo'
import Loader from '../components/UI/loader/Loader'
import DeviceBackground from '../components/UI/devicePageBg/DeviceBackground'

const DevicePage = observer(() => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { basket } = useContext(Context)
	const [loader, setLoader] = useState(true)
	const [device, setDevice] = useState({ info: [] })
	const [thisBrand, setThisBrand] = useState({})
	const [thisType, setThisType] = useState({})

	useEffect(() => {
		try {
			fetchSoloDevice(id).then(data => {
				if (!data) {
					navigate(SHOP_ROUTE)
				} else {
					setDevice(data)
					fetchBrand(data.brandId).then(data => setThisBrand(data))
					fetchType(data.typeId).then(data => setThisType(data))
					setLoader(false)
				}
			})
		} catch (error) {
			navigate(SHOP_ROUTE)
		}
	}, [])

	const deviceInCart = basket.cart.some(el => el.id === device.id)
	const imgDevice = `${process.env.REACT_APP_API_URL}${device.img}`

	if (loader) return <Loader />

	return (
		<div className='device__container'>
			<DeviceBackground />
			<div className='body__container device__flex'>
				<div className='device__img'>
					<img src={imgDevice} alt='Изображение устройства'></img>
				</div>
				<DeviceBaseInfo
					item={device}
					brand={thisBrand}
					type={thisType}
				></DeviceBaseInfo>
				<div className='device__sticky-container'>
					<div className='device__price'>
						<span>{device.price}₽</span>
						{deviceInCart ? (
							<div className='device__redirect'>
								<MyButton onClick={() => basket.deleteDeviceInCart(device)}>
									убрать все
								</MyButton>
								<MyButton
									onClick={() => {
										navigate(BASKET_ROUTE)
									}}
								>
									к заказу
								</MyButton>
							</div>
						) : (
							<MyButton onClick={() => basket.setCart(device)}>
								добавить в корзину
							</MyButton>
						)}
					</div>
				</div>
			</div>
			<div className='device__info'>
				<h3>Характеристика товара</h3>
				{device.info.map(item => (
					<dl key={item.id} className='device__info-block'>
						<dt>{item.title}:</dt>
						<dd>{item.description}</dd>
					</dl>
				))}
			</div>
		</div>
	)
})

export default DevicePage
