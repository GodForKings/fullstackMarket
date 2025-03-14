import React from 'react'
import style from './DeviceBackground.module.css'
import video from './static/pageBg1.mp4'

const DeviceBackground = () => {
	return (
		<div className={style.container}>
			<video src={video} muted autoPlay loop></video>
		</div>
	)
}

export default DeviceBackground
