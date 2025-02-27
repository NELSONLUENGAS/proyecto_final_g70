import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
const { VITE_SERVER_URL } = import.meta.env;

const LoginForm = () => {
	const navigate = useNavigate();
	const { handleSession } = useAuth();
	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setLogin({
			...login,
			[name]: value,
		});
	};

	const { data, loading, error, fetchData } = useFetch('auth/login', {
		method: 'POST',
		body: JSON.stringify(login),
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchData();
	};

	useEffect(() => {
		if (data && !error) {
			handleSession(data);
			if (data.data.role === 'ADMIN') {
				navigate('/admin');
			} else {
				navigate('/profile');
			}
		}
	}, [data, error]);

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4"
		>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email
				</label>
				<input
					onChange={handleChange}
					type="text"
					id="email"
					name="email"
					className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700"
				>
					Password
				</label>
				<input
					onChange={handleChange}
					type="password"
					id="password"
					name="password"
					className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
				/>
			</div>
			<div>
				<button
					type="submit"
					className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
				>
					Sign In
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
