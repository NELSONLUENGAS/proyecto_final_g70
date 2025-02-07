import CryptoJS from 'crypto-js';
import { useState } from 'react';

const { VITE_CRYPTOJS_SECRET } = import.meta.env;

const useEncrypt = () => {
	const [encrypted, setEncrypted] = useState(null);
	const [decrypted, setDecrypted] = useState(null);

	const handleEncrypt = (session) => {
		const sessionEncrypted = CryptoJS.AES.encrypt(
			JSON.stringify(session),
			String(VITE_CRYPTOJS_SECRET)
		).toString();

		setEncrypted(sessionEncrypted);
	};

	const handleDecrypt = (sessionEncrypted) => {
		const sessionDecrypted = CryptoJS.AES.decrypt(
			sessionEncrypted,
			String(VITE_CRYPTOJS_SECRET)
		).toString(CryptoJS.enc.Utf8);

		setDecrypted(sessionDecrypted);
	};

	return {
		encrypted,
		decrypted,
		handleDecrypt,
		handleEncrypt,
	};
};

export default useEncrypt;
