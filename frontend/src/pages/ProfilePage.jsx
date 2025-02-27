import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

const ProfilePage = () => {
	const { session, handleLogout } = useAuth();

	const { data, loading, error, fetchData } = useFetch('inmuebles', {
		method: 'GET',
		token: true,
	});
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<h1>Hola {session.data.email}</h1>

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
