import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../router/routes'
import { SHOP_ROUTE } from '../utils/consts'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const AppRouter = observer(() => {
	const { user } = useContext(Context)
	return (
		<Routes>
			{user.user.role === 'ADMIN' &&
				authRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={Component} exact></Route>
				))}
			{publicRoutes.map(({ path, Component }) => (
				<Route key={path} path={path} element={Component} exact></Route>
			))}
			<Route path='*' element={<Navigate to={SHOP_ROUTE} replace />} />
		</Routes>
	)
})

export default AppRouter
