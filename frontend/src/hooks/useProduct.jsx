import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsProvider';

const useProduct = () => {
	const { products, error, loading } = useContext(ProductsContext);

	return {
		loading,
		products,
		error,
	};
};

export default useProduct;
