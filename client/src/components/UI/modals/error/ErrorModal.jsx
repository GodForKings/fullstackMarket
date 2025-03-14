import React, { useEffect } from 'react'
import style from './ErrorModal.module.css'

const ErrorModal = ({ error, show, setShow }) => {
	const styles = show ? `${style.error} ${style.active}` : style.error
	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => {
				setShow(false)
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [show, setShow])
	return (
		<div className={styles}>
			<span>{error}</span>
		</div>
	)
}

export default ErrorModal
