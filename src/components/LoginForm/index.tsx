import {setStorageCredentials} from '../../utils/storageCredentials'
import styles from './index.module.css'

interface Props {
	onAuth?: () => void
}

const LoginForm = ({onAuth}: Props) => {
	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		const idInstance = formData.get('idInstance')
		const apiTokenInstance = formData.get('apiTokenInstance')

		if (typeof idInstance !== 'string' || typeof apiTokenInstance !== 'string') {
			return
		}

		setStorageCredentials({idInstance, apiTokenInstance})
		onAuth?.()
	}

	return <div className={styles.root}>
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="idInstance"
				placeholder="Введите idInstance"
				required
			/>
			<input
				type="password"
				name="apiTokenInstance"
				placeholder="Введите apiTokenInstance"
				required
			/>
			<button type="submit">Войти</button>
		</form>
	</div>
}

export default LoginForm