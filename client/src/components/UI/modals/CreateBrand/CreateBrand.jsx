import React, { useState } from 'react'
import MyButton from '../../button/MyButton'
import classes from './CreateBrand.module.css'
import { createBrand } from '../../../../http/deviceAPI'

const CreateBrand = ({ showBrand, setShowBrand }) => {
	const [brand, setBrand] = useState('')
	const rootClasses = [classes.createBrand]
	if (showBrand) {
		rootClasses.push(classes.active)
	}

	const addBrand = () => {
		if (brand.length > 1)
			createBrand({ name: brand })
				.then(data => {
					setBrand('')
					setShowBrand()
				})
				.catch(function (error) {
					alert(
						`Ошибка, такой Бренд уже существует: ${error.response.data.message}`
					)
				})
	}

	return (
		<div className={rootClasses.join(' ')}>
			<div
				className={classes.createBrand__Content}
				onClick={e => e.stopPropagation()} // Отключаем всплытие события
			>
				<h2 className={classes.createBrand__title}>Добавьте Бренд</h2>
				<form className={classes.createBrand__form}>
					<input
						type='text'
						placeholder='Введите Бренд'
						value={brand}
						onChange={e => setBrand(e.target.value)}
					/>
				</form>
				<div className={classes.createBrand__bot}>
					<MyButton onClick={addBrand}>добавить</MyButton>
					<MyButton
						onClick={() => {
							setShowBrand()
							setBrand('')
						}}
					>
						закрыть
					</MyButton>
				</div>
			</div>
		</div>
	)
}

export default CreateBrand
