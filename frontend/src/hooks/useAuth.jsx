import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const useAuth = () => {
	const { loading, session, handleSession, handleLogout } =
		useContext(AuthContext);

	return {
		loading,
		session,
		handleSession,
		handleLogout,
	};
};

export default useAuth;
