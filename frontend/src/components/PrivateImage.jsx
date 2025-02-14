import React, { useState, useEffect } from 'react';

const PrivateImage = ({ imageUrl, token }) => {
	const [imageSrc, setImageSrc] = useState(''); // Estado para almacenar la URL de la imagen
	const [loading, setLoading] = useState(true); // Estado para manejar la carga
	const [error, setError] = useState(null); // Estado para manejar errores

	useEffect(() => {
		const fetchImage = async () => {
			try {
				const response = await fetch(imageUrl, {
					headers: {
						Authorization: `Bearer ${token}`, // Incluir el token en el header
					},
				});

				if (!response.ok) {
					throw new Error('Error al obtener la imagen');
				}

				const blob = await response.blob(); // Convertir la respuesta en un blob
				const objectUrl = URL.createObjectURL(blob); // Crear una URL para el blob
				setImageSrc(objectUrl); // Establecer la URL en el estado
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchImage();
	}, [imageUrl, token]);

	if (loading) {
		return <p>Cargando imagen...</p>;
	}

	if (error) {
		return <p style={{ color: 'red' }}>{error}</p>;
	}

	return (
		<div>
			<img
				src={imageSrc}
				alt="Imagen privada"
				style={{ maxWidth: '100%', height: 'auto' }}
			/>
		</div>
	);
};

export default PrivateImage;
