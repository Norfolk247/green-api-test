import {useState} from 'react'
import {StartForm} from '../StartForm'
import {ChatContent} from '../ChatContent'
import styles from './index.module.css'

const Chat = () => {
	const [phoneNumber, setPhoneNumber] = useState('')

	const handleChatStarted = (value: string) => {
		setPhoneNumber(value)
	}

	return (
		<div className={styles.root}>
			{phoneNumber ? (
				<ChatContent onChatReset={()=>setPhoneNumber('')} phoneNumber={phoneNumber} />
			) : (
				<StartForm onChatStarted={handleChatStarted} />
			)}
		</div>
	);
}

export default Chat;