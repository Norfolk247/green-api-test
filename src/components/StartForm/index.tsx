import React, {useState} from 'react'
import styles from './index.module.css'

interface Props {
	onChatStarted?: (phoneNumber: string) => void
}

export const StartForm = ({onChatStarted}: Props) => {
	const [phoneNumber, setPhoneNumber] = useState('')

	const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
			.replace(/\D/g, '')
			.replace(/^8/, '7')
			.slice(0, 11)

		setPhoneNumber(value)
	}

	return <div className={styles.root}>
		<input
			type="text"
			placeholder="Введите номер телефона получателя (например: 79001234567)"
			value={phoneNumber}
			onChange={handlePhoneNumberChange}
		/>
		<div className={styles.hint}>
			Формат: 7XXXXXXXXXX (без +)
		</div>
		<button onClick={() => onChatStarted?.(phoneNumber)}>Начать чат</button>
	</div>
}