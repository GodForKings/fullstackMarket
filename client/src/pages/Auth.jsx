import React, { useContext, useState } from 'react'
import MyButton from '../components/UI/button/MyButton'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import ErrorModal from '../components/UI/modals/error/ErrorModal'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorModal, setErrorModal] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const click = async () => {
		try {
			let userData
			if (isLogin) {
				userData = await login(email, password)
			} else {
				userData = await registration(email, password)
			}
			user.setUser(userData)
			user.setIsAuth(true)
			navigate(SHOP_ROUTE)
		} catch (error) {
			setErrorModal(true)
			setErrorMessage(error?.response?.data?.message || `Произошла ошибка`)
		}
	}
	return (
		<div className='body__container'>
			<div className='auth__flex'>
				<div className='auth__card'>
					<i style={{ '--clr': '#39ff14' }}></i>
					<i style={{ '--clr': '#bc13fe' }}></i>
					<i style={{ '--clr': '#7df9ff' }}></i>
					<form className='auth__card__form'>
						<h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
						<div className='auth__inputBx'>
							<input
								required
								className='auth__card__input'
								type='email'
								placeholder='Введите ваш email...'
								name='emailUser'
								id='email-input'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>

						<div className='auth__inputBx'>
							<input
								required
								className='auth__card__input'
								type='password'
								placeholder='Введите ваш пароль...'
								name='userPassword'
								id='password-input'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>

						<div className='auth__card__alt'>
							{isLogin ? (
								<span>
									Нет аккаунта?
									<Link to={REGISTRATION_ROUTE}>Зарегистрироваться</Link>
								</span>
							) : (
								<span>
									Есть аккаунт?
									<Link to={LOGIN_ROUTE}>Авторизоваться</Link>
								</span>
							)}
							<MyButton
								onClick={e => {
									e.preventDefault()
									click()
								}}
							>
								{isLogin ? 'Войти' : 'Регистрация'}
							</MyButton>
						</div>
					</form>
				</div>
			</div>
			<ErrorModal
				error={errorMessage}
				show={errorModal}
				setShow={setErrorModal}
			></ErrorModal>
		</div>
	)
})

export default Auth
