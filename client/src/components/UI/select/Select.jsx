import React from 'react'
import classes from './Select.module.css'

const Select = ({ children, props, onChange }) => {
	return (
		<select className={classes.select} onChange={onChange}>
			{children ? <option>{children}</option> : <option>Выберите</option>}
			{props.map(prop => (
				<option key={prop.id} value={prop.name}>
					{prop.name}
				</option>
			))}
		</select>
	)
}

export default React.memo(Select)
