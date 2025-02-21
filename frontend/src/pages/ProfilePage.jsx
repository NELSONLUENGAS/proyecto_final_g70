import React from 'react';
import useAuth from '../hooks/useAuth';

const ProfilePage = () => {
	const { session, handleLogout } = useAuth();

	return (
		<div>
			<h1>Hola {session.email}</h1>

			<button
				onClick={() => handleLogout()}
				className="rounded-lg py-2 px-3 bg-blue-500"
			>
				Logout
			</button>
		</div>
	);
};

export default ProfilePage;
