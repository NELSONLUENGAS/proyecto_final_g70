import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import CustomLoading from '../components/CustomLoading';

const AuthGuard = ({ children, isAllow, redirectTo = '/' }) => {
	const { loading } = useAuth();

	if (loading) {
		return <CustomLoading />;
	}

	if (!isAllow) {
		return (
			<Navigate
				to={redirectTo}
				replace
			/>
		);
	}

	return children ? children : <Outlet />;
};

export default AuthGuard;
