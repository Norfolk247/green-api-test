const KEY = 'credentials'

interface StorageCredentials {
	idInstance: string
	apiTokenInstance: string
}

export const getStorageCredentials = (): StorageCredentials | null => {
	const rawCredentials = localStorage.getItem(KEY)

	return rawCredentials ? JSON.parse(rawCredentials) : null
}

export const setStorageCredentials = ({apiTokenInstance, idInstance}: StorageCredentials) =>
	localStorage.setItem(KEY, JSON.stringify({apiTokenInstance, idInstance}))

export const removeStorageCredentials = () =>
	localStorage.removeItem(KEY)