import React, { createContext, useEffect, useState } from 'react';

export const ProductsContext = createContext();
export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		handleFetchProducts();
	}, []);

	const handleFetchProducts = async () => {
		try {
			const response = await fetch('products.json');
			const data = await response.json();

			setProducts(data);
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	return (
		<ProductsContext.Provider value={{ products, loading, error }}>
			{children}
		</ProductsContext.Provider>
	);
};
