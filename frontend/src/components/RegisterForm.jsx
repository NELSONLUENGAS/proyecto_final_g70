import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const RegisterForm = () => {
	const navigate = useNavigate();

	const [register, setRegister] = useState({
		email: '',
		password: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setRegister({
			...register,
			[name]: value,
		});
	};

	const { data, loading, error, fetchData } = useFetch('auth/register', {
		method: 'POST',
		body: JSON.stringify(register),
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		fetchData();
	};

	useEffect(() => {
		if (data && !error) {
			navigate('/login');
		}
	}, [data, error]);

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4"
		>
			<div>
				<label
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
				>
					Username
				</label>
				<input
					onChange={handleChange}
					type="text"
					id="username"
					name="username"
					className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
				/>
			</div>
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
					className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
				>
					Sign Up
				</button>
			</div>
		</form>
	);
};

export default RegisterForm;
