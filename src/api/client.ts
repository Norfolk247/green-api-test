import axios from "axios";
import {getStorageCredentials} from '../utils/storageCredentials'

const apiClient = axios.create({
	baseURL: 'https://api.green-api.com/waInstance'
})

const getCredentials = () => {
	const credentials = getStorageCredentials()
	if (!credentials) throw new Error('no credentials')

	return credentials
}

interface SendMessageProps {
	phoneNumber: string
	message: string
}
export const sendMessage = async ({phoneNumber, message}: SendMessageProps) => {
	const {idInstance, apiTokenInstance} = getCredentials()

	const response = await apiClient.post(
		`${idInstance}/SendMessage/${apiTokenInstance}`,
		{
			chatId: `${phoneNumber}@c.us`,
			message: message,
		}
	)

	if (!response.data?.idMessage) throw new Error('Не удалось отправить сообщение')

	return response.data.idMessage
}

type ReceiveNotification = (props: {phoneNumber: string}) => Promise<{
	message?: string
	receiptId: string
} | null>
export const receiveNotification: ReceiveNotification = async ({phoneNumber}) => {
	const {idInstance, apiTokenInstance} = getCredentials()

	const response = await apiClient.get(
		`${idInstance}/ReceiveNotification/${apiTokenInstance}`,
	)

	const receiptId = response.data?.receiptId
	if (!receiptId) return null

	if (response.data.body.typeWebhook !== 'incomingMessageReceived') return {receiptId}

	const message = response.data.body.messageData?.textMessageData?.textMessage;
	const sender = response.data.body.senderData?.sender?.split('@')[0];

	if (!message || sender !== phoneNumber) return {receiptId}

	return {message, receiptId}
}

export const deleteNotification = async (receiptId: string) => {
	const {idInstance, apiTokenInstance} = getCredentials()

	const response = await apiClient.delete(
		`${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
	)

	return response.data
}