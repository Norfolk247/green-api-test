import {useEffect} from 'react'
import {deleteNotification, receiveNotification} from '../../api/client'
import {useChatStatusContext, type ChatStatus} from './ChatStatusContext'
import styles from './MessagesHistory.module.css'

interface Props {
	onNewMessageReceived?: (newMessages: ChatStatus['messagesHistory'][number]) => void
	onError?: (errorMessage: string) => void
}

export const MessagesHistory = ({onNewMessageReceived, onError}: Props) => {
	const {errorMessage, messagesHistory, phoneNumber} = useChatStatusContext()

	useEffect(() => {
		const intervalId = setInterval(
			()=>receiveNotification({phoneNumber})
				.then(notification => {
					const {receiptId, message} = notification || {}

					if (message) {
						onNewMessageReceived?.({text: message, sent: false})
					}
					if (receiptId) {
						return deleteNotification(receiptId)
					}
				})
				.catch(err=>onError?.(err))
			, 1000
		)

		return ()=>{
			clearInterval(intervalId)
		}
	})

	return <div className={styles.root} >
		{errorMessage && <div className={styles.error}>{errorMessage}</div>}
		{messagesHistory.map((msg, index) => (
			<div key={index} className={`${styles.message} ${msg.sent ? styles.sent : styles.received}`}>
				{msg.text}
			</div>
		))}
	</div>
}