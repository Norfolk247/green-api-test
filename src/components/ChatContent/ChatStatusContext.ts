import {createContext, useContext} from 'react'

export enum ConnectionStatus {
	CONNECTING = 'connecting',
	CONNECTED = 'connected',
	ERROR = 'error'
}

interface Message {
	text: string
	sent: boolean
}

export interface ChatStatus {
	connectionStatus: ConnectionStatus
	errorMessage: string|null
	isSending: boolean
	messagesHistory: Message[]
	phoneNumber: string
}

export const ChatStatusContext = createContext<ChatStatus>({
	connectionStatus: ConnectionStatus.CONNECTING,
	errorMessage: null,
	isSending: false,
	messagesHistory: [],
	phoneNumber: ''
})
export const useChatStatusContext = () => {
	const context = useContext(ChatStatusContext)

	if (!context) {
		throw new Error('use ChatStatusContext inside ChatStatusContext provider')
	}

	return context
}