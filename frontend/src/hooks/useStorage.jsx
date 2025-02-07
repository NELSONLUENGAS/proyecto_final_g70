import { useEffect } from 'react';
import useEncrypt from './useEncrypt';

const useStorage = () => {
	const { encrypted, decrypted, handleDecrypt, handleEncrypt } = useEncrypt();

	const handleSetStorageSession = (session) => {
		handleEncrypt(session);
	};

	const handleGetStorageSession = () => {
		const encryptedSession = localStorage.getItem('USER_SESSION');
		if (encryptedSession) {
			handleDecrypt(encryptedSession);
		}
	};

	useEffect(() => {
		if (encrypted) {
			localStorage.setItem('USER_SESSION', encrypted);
		}
	}, [encrypted]);

	return {
		handleSetStorageSession,
		handleGetStorageSession,
		decrypted,
	};
};

export default useStorage;
