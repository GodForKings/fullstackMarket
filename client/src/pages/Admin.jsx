import React, { useState } from 'react'
import MyButton from '../components/UI/button/MyButton'
import '../styles/admin.css'
import CreateBrand from '../components/UI/modals/CreateBrand/CreateBrand'
import CreateDevice from '../components/UI/modals/CreateDevice/CreateDevice'
import CreateType from '../components/UI/modals/CreateType/CreateType'
import DeleteDevice from '../components/UI/modals/deleteDevice/DeleteDevice'

const Admin = () => {
	const [showBrand, setShowBrand] = useState(false)
	const [showType, setShowType] = useState(false)
	const [showDevice, setShowDevice] = useState(false)
	const [showKill, setShowKill] = useState(false)
	return (
		<div className='body__container admin__flex'>
			<div className='admin__bg'></div>
			<MyButton onClick={() => setShowDevice(true)}>
				добавить<strong className='admin__button__strong'>устройство</strong>
			</MyButton>
			<MyButton onClick={() => setShowType(true)}>
				добавить<strong className='admin__button__strong'>тип</strong>устройства
			</MyButton>
			<MyButton onClick={() => setShowBrand(true)}>
				добавить
				<strong className='admin__button__strong'>бренд</strong>
				устройства
			</MyButton>
			<MyButton onClick={() => setShowKill(true)}>
				Удалить <strong className='admin__button__strong'>устройство</strong>
			</MyButton>

			<CreateDevice
				showDevice={showDevice}
				setShowDevice={() => setShowDevice(false)}
			/>
			<CreateType showType={showType} setShowType={() => setShowType(false)} />
			<CreateBrand
				showBrand={showBrand}
				setShowBrand={() => setShowBrand(false)}
			/>
			<DeleteDevice
				showKill={showKill}
				setShowKill={() => setShowKill(false)}
			/>
		</div>
	)
}

export default Admin
