import React from 'react';
import useProduct from '../hooks/useProduct';
import FileUploader from '../components/FileUploader';

const HomePage = () => {
	const { products, loading } = useProduct();

	console.log(products, 'Products home');

	return (
		<div>
			<FileUploader />
		</div>
	);
};

export default HomePage;
