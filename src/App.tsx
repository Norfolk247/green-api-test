import {lazy, Suspense, useState} from 'react'
import {getStorageCredentials} from './utils/storageCredentials'
import styles from './App.module.css'

const LazyChat = lazy(() => import('./components/Chat'))
const LazyLogin = lazy(() => import('./components/LoginForm'))

function App() {
	const [isAuth, setIsAuth] = useState(!!getStorageCredentials())

	return (
		<div className={styles.app}>
			{isAuth ?
				<Suspense>
					<LazyChat/>
				</Suspense>
				:
				<Suspense>
					<LazyLogin onAuth={() => setIsAuth(true)}/>
				</Suspense>
			}
		</div>
	)
}

export default App
