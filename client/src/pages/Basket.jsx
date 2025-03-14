import React, { useState } from 'react'
import style from '../styles/basket.module.css'
import Loader from '../components/UI/loader/Loader'
import bg_video from '../styles/static/bg_video_urgot.mp4'
import BasketContent from '../components/UI/basketContent/BasketContent'

const Basket = () => {
	const [loading, setLoading] = useState(false)
	if (loading) return <Loader />
	return (
		<div className={style.basket__main}>
			<div className={style.basket__bg}>
				<video src={bg_video} autoPlay muted loop></video>
			</div>
			<BasketContent />
		</div>
	)
}

export default Basket
