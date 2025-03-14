import Admin from '../pages/Admin'
import Auth from '../pages/Auth'
import Basket from '../pages/Basket'
import DevicePage from '../pages/DevicePage'
import Shop from '../pages/Shop'
import About from '../pages/About'
import {
	ADMIN_ROUTE,
	BASKET_ROUTE,
	DEVICE_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	SHOP_ROUTE,
	ABOUT,
} from '../utils/consts'

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: <Admin />,
	},
]

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: <Shop />,
	},
	{
		path: LOGIN_ROUTE,
		Component: <Auth />,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: <Auth />,
	},
	{
		path: `${DEVICE_ROUTE}/:id`,
		Component: <DevicePage />,
	},
	{
		path: BASKET_ROUTE,
		Component: <Basket />,
	},
	{
		path: ABOUT,
		Component: <About />,
	},
]
