import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/UI/navbar/NavBar'
import './styles/main.css'
import { observer } from 'mobx-react-lite'
import { Context } from '.'
import Loader from './components/UI/loader/Loader'
import { check } from './http/userAPI'
import ErrorModal from './components/UI/modals/error/ErrorModal'

const App = observer(() => {
	const { user, basket } = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (localStorage.getItem('cart')) {
			basket.preLoading(JSON.parse(localStorage.getItem('cart')))
		}
		if (localStorage.getItem('token')) {
			check()
				.then(data => {
					user.setUser(data)
					user.setIsAuth(true)
				})
				.catch(function (error) {
					localStorage.removeItem('token')
				})
				.finally(() => {
					setLoading(false)
				})
		} else {
			setLoading(false)
		}
	}, [])

	if (loading) return <Loader />

	return (
		<BrowserRouter>
			<NavBar></NavBar>
			<AppRouter></AppRouter>
		</BrowserRouter>
	)
})

export default App
