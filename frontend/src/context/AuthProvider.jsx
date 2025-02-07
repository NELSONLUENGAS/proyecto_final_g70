import React, { createContext, useEffect, useState } from 'react';
import useStorage from '../hooks/useStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const { handleSetStorageSession, handleGetStorageSession, decrypted } =
		useStorage();

	const [loading, setLoading] = useState(true);
	const [session, setSession] = useState(null);

	const handleSession = (session) => {
		setSession(session);
		handleSetStorageSession(session);
	};

	const handleLogout = () => {
		setSession(null);
		localStorage.removeItem('USER_SESSION');
	};

	useEffect(() => {
		handleGetStorageSession();
	}, []);

	useEffect(() => {
		if (decrypted) {
			setSession(JSON.parse(decrypted));
		}

		setTimeout(() => {
			setLoading(false);
		}, 1);
	}, [decrypted]);

	return (
		<AuthContext.Provider
			value={{ loading, session, handleSession, handleLogout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
