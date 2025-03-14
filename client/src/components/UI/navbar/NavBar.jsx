import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '../../..'
import { Link, useLocation } from 'react-router-dom'
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	DEVICE_ROUTE,
	LOGIN_ROUTE,
	SHOP_ROUTE,
} from '../../../utils/consts'
import classes from './NavBar.module.css'
import logo from './static/logo.png'
import { observer } from 'mobx-react-lite'
import Cart from './cart/Cart'
import { gsap } from 'gsap'

const NavBar = observer(() => {
	const location = useLocation()
	const { user, device } = useContext(Context)
	const refNav = useRef(null)
	useEffect(() => {
		gsap.fromTo(
			refNav.current,
			{
				y: '-100%',
				opacity: 0.3,
			},
			{ y: 0, opacity: 1, ease: 'power3.out', duration: 3 }
		)
	}, [])

	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
		localStorage.removeItem('token')
	}
	return (
		<header className={classes.nav} ref={refNav}>
			<div>
				<Link
					to={SHOP_ROUTE}
					onClick={() => {
						device.setSelectedType({})
						device.setSelectedBrand({})
						device.setTargetPage(1)
					}}
				>
					<img src={logo} alt='logo' />
				</Link>
			</div>

			{user.isAuth ? (
				<ul>
					{user.user.role === 'ADMIN' ? (
						<li>
							<Link
								to={ADMIN_ROUTE}
								className={
									location.pathname === ADMIN_ROUTE ? classes.active : undefined
								}
							>
								Admin
							</Link>
						</li>
					) : undefined}
					<li>
						<Link
							to={SHOP_ROUTE}
							className={
								location.pathname === SHOP_ROUTE ? classes.active : undefined
							}
						>
							shop
						</Link>
					</li>
					<li>
						<Link to={LOGIN_ROUTE} onClick={logOut}>
							out
						</Link>
					</li>
				</ul>
			) : (
				<ul>
					<li>
						<Link to={LOGIN_ROUTE}>Login</Link>
					</li>
					<li>
						<Link
							to={SHOP_ROUTE}
							className={
								location.pathname === SHOP_ROUTE ? classes.active : undefined
							}
						>
							Main
						</Link>
					</li>
				</ul>
			)}
			<Cart active={location.pathname === BASKET_ROUTE} />
		</header>
	)
})

export default NavBar
