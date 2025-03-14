import React, { useContext, useState } from 'react'
import style from './OrderForm.module.css'
import MyButton from '../../button/MyButton'
import { sendMessage } from '../../../../http/orderAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../..'
import { PHONE_REGEX } from '../../../../utils/consts'

const OrderForm = observer(({ show, setShow, resultPrice }) => {
	const { basket } = useContext(Context)
	const [clientName, setClientName] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')
	//Функция отправки ордера на бэк
	const createOrder = () => {
		if (clientName.length > 2 && PHONE_REGEX.test(phone))
			// sendMessage(clientName, phone, message)
			// 	.then(data => {
			// 		console.log(`Great: ${data?.response?.message}`)
			// 	})
			// 	.catch(error => {})
			return
		else console.log('ошибка номера')
	}

	const inputChanger = (value, setValue) => {
		setValue(value.target.value)
	}
	return (
		<div
			className={
				show
					? [style.orderModal, style.activeModal].join(' ')
					: style.orderModal
			}
			onClick={() => setShow()}
		>
			<form onClick={e => e.stopPropagation()} className={style.orderForm}>
				<div className={style.orderForm__inputs}>
					<div className={style.orderInputBx}>
						<input
							type='text'
							id='userName-input'
							name='orderUserName'
							placeholder='Введите ваше имя'
							value={clientName || ''}
							onChange={e => inputChanger(e, setClientName)}
						/>
					</div>
					<div className={style.orderInputBx}>
						<input
							type='text'
							id='phone-input'
							name='phoneOrder'
							placeholder='Введите номер телефона'
							value={phone || ''}
							onChange={e => inputChanger(e, setPhone)}
						/>
					</div>
					<div className={style.orderInputBx}>
						<textarea
							className={style.comment}
							type='text'
							id='comment-input'
							name='commentOrder'
							placeholder='Введите ваш комментарий...'
							value={message || ''}
							onChange={e => inputChanger(e, setMessage)}
						/>
					</div>
					<h2 className={style.price}>Общая сумма : {resultPrice} ₽</h2>
					{basket.totalItems > 0 ? (
						<MyButton
							onClick={e => {
								e.preventDefault()
								createOrder()
							}}
						>
							Отправить
						</MyButton>
					) : undefined}
				</div>
			</form>
		</div>
	)
})

export default OrderForm
