import { observer } from 'mobx-react-lite'
import React, { useContext, useRef, useEffect } from 'react'
import { Context } from '../../..'
import classes from './TypeBar.module.css'
import { gsap } from 'gsap'

const TypeBar = observer(() => {
	const refBar = useRef(null)
	const { device } = useContext(Context)
	const typeClass = [classes.typeBar__item, classes.active]
	useEffect(() => {
		const animate = gsap.timeline()
		animate.fromTo(
			refBar.current,
			{ opacity: 0, y: '20px' },
			{ opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
		)
		return () => animate.kill()
	}, [])
	return (
		<ul className={classes.typeBar} ref={refBar}>
			{device.types.map(type => (
				<li
					className={
						device.selectedType.id === type.id
							? typeClass.join(' ')
							: classes.typeBar__item
					}
					key={type.id}
					onClick={() => {
						device.setSelectedType(type)
						device.setTargetPage(1)
					}}
				>
					{type.name}
				</li>
			))}
		</ul>
	)
})

export default TypeBar
