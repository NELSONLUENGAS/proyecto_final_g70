import React from 'react';
import useProduct from '../hooks/useProduct';

const HomePage = () => {
	const { products, loading } = useProduct();

	console.log(products, 'Products home');

	return <div>Hola</div>;
};

export default HomePage;
