import {useChatStatusContext} from './ChatStatusContext'
import {ConnectionStatus as ConnectionStatusTitles} from './ChatStatusContext'
import styles from './ConnectionStatus.module.css'

export const ConnectionStatus = () => {
	const {connectionStatus} = useChatStatusContext()
	const title: string = (()=>{
		switch (connectionStatus) {
			case ConnectionStatusTitles.CONNECTING:
				return 'Подключение...'
			case ConnectionStatusTitles.CONNECTED:
				return 'Подключено'
			case ConnectionStatusTitles.ERROR:
				return 'Ошибка подключения'
		}
	})()

	return <span className={`${styles.root} ${styles[connectionStatus]}`}>
		{title}
	</span>
}