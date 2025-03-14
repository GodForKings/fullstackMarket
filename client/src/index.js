import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserStore from './store/UserStore'
import DeviceStore from './store/DeviceStore'
import BasketStore from './store/BasketStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Context.Provider
			value={{
				basket: new BasketStore(),
				user: new UserStore(),
				device: new DeviceStore(),
			}}
		>
			<App />
		</Context.Provider>
	</React.StrictMode>
)
