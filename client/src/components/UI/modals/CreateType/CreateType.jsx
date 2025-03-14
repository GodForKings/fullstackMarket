import React, { useState } from 'react'
import MyButton from '../../button/MyButton'
import classes from './CreateType.module.css'
import { createType } from '../../../../http/deviceAPI'

const CreateBrand = ({ showType, setShowType }) => {
	const rootClasses = [classes.createType]
	if (showType) {
		rootClasses.push(classes.active)
	}
	const [type, setType] = useState('')
	const [title, setTitle] = useState('Добавьте Тип')
	const addType = () => {
		if (type) {
			createType({ name: type })
				.then(data => {
					setType('')
					setShowType()
				})
				.catch(error => setTitle('Некорректно'))
		} else {
			setTitle('Некорректно')
		}
	}

	return (
		<div className={rootClasses.join(' ')}>
			<div
				className={classes.createType__Content}
				onClick={e => e.stopPropagation()} // Отключаем всплытие события
			>
				<h2
					className={
						title === 'Некорректно'
							? [classes.createType__title, classes.incorrect].join(' ')
							: classes.createType__title
					}
				>
					{title}
				</h2>
				<form className={classes.createType__form}>
					<input
						type='text'
						placeholder='Введите Тип'
						value={type}
						onChange={e => setType(e.target.value)}
					/>
				</form>
				<div className={classes.createType__bot}>
					<MyButton onClick={addType}>добавить</MyButton>
					<MyButton
						onClick={() => {
							setShowType()
							setType('')
							setTitle('Добавьте Тип')
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
