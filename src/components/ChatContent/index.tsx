import {useState} from 'react'
import {removeStorageCredentials} from '../../utils/storageCredentials'
import {type ChatStatus, ChatStatusContext, ConnectionStatus} from './ChatStatusContext'
import {ConnectionStatus as ConnectionStatusTitle} from './ConnectionStatus'
import {MessagesHistory} from './MessagesHistory'
import {InputPanel} from './InputPanel'
import styles from './index.module.css'

interface Props {
	onChatReset?: () => void
	phoneNumber: string
}


export const ChatContent = ({onChatReset, phoneNumber}: Props) => {
	const [chatStatus, setChatStatus] = useState<ChatStatus>({
		connectionStatus: ConnectionStatus.CONNECTING,
		errorMessage: null,
		isSending: false,
		messagesHistory: [],
		phoneNumber
	})

	const handleResetChat = () => {
		onChatReset?.()
		removeStorageCredentials()
	}
	const handleSendingMessage = () => setChatStatus(prev => ({
		...prev,
		isSending: true,
		errorMessage: null
	}))
	const handleMessageSend = (newMessage: ChatStatus['messagesHistory'][number]) => setChatStatus(prev => ({
		...prev,
		messagesHistory: [...prev.messagesHistory, newMessage],
		isSending: false
	}))
	const handleError = (errorMessage: string) => setChatStatus(prev => ({
		...prev,
		errorMessage,
		isSending: false,
	}))
	const handleMessageHistoryError = () => setChatStatus(prev => ({
		...prev,
		connectionStatus: ConnectionStatus.ERROR,
	}))
	const handleMessageHistoryReceived = (newMessage: ChatStatus['messagesHistory'][number]) => setChatStatus(prev => ({
		...prev,
		messagesHistory: [...prev.messagesHistory, newMessage],
		connectionStatus: ConnectionStatus.CONNECTED,
	}))

	return <ChatStatusContext.Provider value={chatStatus}>
		<div className={styles.header}>
			<div className={styles.headerLeft}>
				<button onClick={handleResetChat} className={styles.backButton}>←</button>
				<span className={styles.title}>Чат с {phoneNumber}</span>
			</div>
			<ConnectionStatusTitle/>
		</div>
		<MessagesHistory onNewMessageReceived={handleMessageHistoryReceived} onError={handleMessageHistoryError}/>
		<InputPanel onMessageSending={handleSendingMessage} onMessageSend={handleMessageSend} onError={handleError}/>
	</ChatStatusContext.Provider>
}