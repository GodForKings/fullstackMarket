import React, { useContext, useState } from 'react'
import style from './BasketContent.module.css'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'
import MyButton from '../button/MyButton'
import { DEVICE_ROUTE, LOGIN_ROUTE } from '../../../utils/consts'
import { useNavigate } from 'react-router-dom'
import OrderForm from '../modals/OrderForm/OrderForm'

const BasketContent = observer(() => {
	const { basket, user } = useContext(Context)
	const navigate = useNavigate()
	const [showOrder, setShowOrder] = useState(false)
	const formatter = new Intl.NumberFormat('ru-RU')
	const resultPrice = formatter.format(basket.finalPrice)
	return (
		<div className={style.content__box}>
			<div className={style.basket__container}>
				{!basket.cart.length ? (
					<h1>Ваша корзина сейчас пуста</h1>
				) : (
					basket.cart.map(item => (
						<div className={style.basket__item} key={item.id}>
							<img
								onClick={() => navigate(`${DEVICE_ROUTE}/${item.id}`)}
								src={`${process.env.REACT_APP_API_URL}${item.img}`}
							/>
							<span>{item.name}</span>
							<div className={style.basket__counter}>
								<MyButton
									disabled={item.quantity < 2}
									onClick={() => basket.decrementDevice(item)}
								>
									-
								</MyButton>
								<span>{item.quantity}</span>
								<MyButton
									disabled={item.quantity > 14}
									onClick={() => basket.incrementDevice(item)}
								>
									+
								</MyButton>
							</div>
							<div className={style.basket__price}>
								<span>{formatter.format(item.quantity * item.price)}₽</span>
								<button
									onClick={() => {
										basket.deleteDeviceInCart(item)
									}}
									className={style.basket__priceDelete}
								></button>
							</div>
						</div>
					))
				)}
			</div>

			<div className={style.finalPrice}>
				<MyButton
					disabled={basket.totalItems < 1}
					onClick={() =>
						user.isAuth ? setShowOrder(true) : navigate(LOGIN_ROUTE)
					}
				>
					{user.isAuth ? 'перейти к оформлению' : 'сначала авторизуйтесь'}
				</MyButton>
				<span>Сумма вашего заказа: {resultPrice}₽</span>
			</div>
			<OrderForm
				show={showOrder}
				setShow={() => setShowOrder(false)}
				resultPrice={resultPrice}
			></OrderForm>
		</div>
	)
})

export default BasketContent
