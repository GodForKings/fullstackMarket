import React, { useContext, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../..'
import DeviceItem from './deviceItem/DeviceItem'
import classes from './DeviceList.module.css'
import { gsap } from 'gsap'

const DeviceList = observer(() => {
	const { device } = useContext(Context)
	const refGrid = useRef(null)

	useEffect(() => {
		gsap.fromTo(
			refGrid.current,
			{
				y: 50,
			},
			{
				y: 0,
				duration: 1,
				ease: 'circ.out',
			}
		)
	}, [])

	return (
		<div className={classes.device__grid} ref={refGrid}>
			{device.devices.map(item => (
				<DeviceItem key={item.id} device={item} />
			))}
		</div>
	)
})

export default DeviceList
