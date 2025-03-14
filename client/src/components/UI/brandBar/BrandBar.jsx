import React, { useContext, useRef, useEffect } from 'react'
import { Context } from '../../..'
import { observer } from 'mobx-react-lite'
import classes from './BrandBar.module.css'
import { gsap } from 'gsap'

const BrandBar = observer(() => {
	const { device } = useContext(Context)
	const refBar = useRef(null)
	const refItem = useRef(null)
	const activeBrand = `${classes.brandBar__item} ${classes.active}`
	useEffect(() => {
		gsap.fromTo(
			refBar.current,
			{
				y: '-30px',
				transform: 'rotate3d(1, 2, 0, 10deg)',
			},
			{
				y: 0,
				duration: 1,
				transform: 'rotate3d(0,0,0,0)',
				ease: 'elastic.out(1,0.4)',
			}
		)
	}, [])
	return (
		<ul className={classes.brandBar} ref={refBar}>
			{device.brands.map(brand => (
				<li
					className={
						device.selectedBrand.id === brand.id
							? activeBrand
							: classes.brandBar__item
					}
					key={brand.id}
					onClick={() => {
						device.setSelectedBrand(brand)
						device.setTargetPage(1)
					}}
					ref={refItem}
				>
					{brand.name}
				</li>
			))}
		</ul>
	)
})

export default BrandBar
