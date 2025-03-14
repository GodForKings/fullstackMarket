import React, { useContext } from 'react'
import classes from './Cart.module.css'
import cart from '../static/cart.svg'
import { Link } from 'react-router-dom'
import { BASKET_ROUTE } from '../../../../utils/consts'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../..'

const Cart = observer(({ active }) => {
	const { basket } = useContext(Context)
	return (
		<div className={classes.cart}>
			<Link to={BASKET_ROUTE} className={active ? classes.active : undefined}>
				<div className={classes.counter}>{basket.totalItems}</div>
				<img src={cart} alt='cart-img'></img>
			</Link>
		</div>
	)
})

export default Cart
