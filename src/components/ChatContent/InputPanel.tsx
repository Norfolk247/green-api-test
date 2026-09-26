import {useState} from 'react'
import {sendMessage} from '../../api/client'
import {useChatStatusContext, type ChatStatus} from './ChatStatusContext'
import styles from './InputPanel.module.css'

interface Props {
	onMessageSending?: () => void
	onMessageSend?: (newMessage: ChatStatus['messagesHistory'][number]) => void
	onError?: (errorMessage: string) => void
}

export const InputPanel = ({onMessageSending, onMessageSend, onError}: Props) => {
	const [message, setMessage] = useState('')
	const {isSending, phoneNumber} = useChatStatusContext()

	const handleSendMessage = () => {
		onMessageSending?.()
		sendMessage({phoneNumber, message})
			.then(() => {
				onMessageSend?.({text: message, sent: true})
				setMessage('')
			})
			.catch(err => {
				console.error('Error sending message:', err)
				onError?.(`
					Ошибка при отправке: 
					${err}
					Убедитесь, что:
					1. Номер введен правильно
					2. У получателя установлен WhatsApp
					3. Ваш аккаунт GREEN-API активен
					`)
			})
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	}

	return <div className={styles.root}>
		<input
			type="text"
			value={message}
			onChange={(e) => setMessage(e.target.value)}
			onKeyDown={handleKeyDown}
			placeholder="Введите сообщение"
			disabled={isSending}
		/>
		<button
			onClick={handleSendMessage}
			disabled={isSending || !message.trim()}
		>
			{isSending ? '...' : '➤'}
		</button>
	</div>
}