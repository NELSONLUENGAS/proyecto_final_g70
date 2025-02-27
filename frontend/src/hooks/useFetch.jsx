import { useCallback, useEffect, useState } from 'react';
import useAuth from './useAuth';
const { VITE_SERVER_URL } = import.meta.env;

const API_BASE_URL = `${VITE_SERVER_URL}/api/v2`;

const useFetch = (
	endpoint,
	{
		method = 'GET',
		body = null,
		headers = {
			'Content-Type': 'application/json',
		},
		token = false,
		isFile = false,
	} = {}
) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	const { session } = useAuth();

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const finalHeaders = isFile
				? {}
				: {
						...headers,
				  };

			if (token) {
				const userToken = session.data.token;
				if (userToken) {
					finalHeaders['Authorization'] = `Bearer ${userToken}`;
				}
			}

			const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
				method,
				headers: finalHeaders,
				body,
			});

			const result = await response.json();

			if (!response.ok) throw new Error(result.msg || 'Error en la solicitud');

			setData(result);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}, [endpoint, method, body, headers, token]);

	return {
		data,
		loading,
		error,
		fetchData,
	};
};

export default useFetch;
