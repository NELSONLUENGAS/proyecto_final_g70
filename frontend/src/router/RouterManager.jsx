import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import MainLayout from '../layouts/MainLayout';
import AuthGuard from '../guard/AuthGuard';
import useAuth from '../hooks/useAuth';
import AdminLayout from '../layouts/AdminLayout';

const RouterManager = () => {
	const { session } = useAuth();
	console.log(session);
	return (
		<Router>
			<Routes>
				<Route
					path="*"
					element={<NotFound />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/register"
					element={<RegisterPage />}
				/>
				<Route
					path="/"
					element={<MainLayout />}
				>
					<Route
						index
						element={<HomePage />}
					/>

					<Route
						path="/profile"
						element={
							<AuthGuard
								isAllow={session?.token}
								redirectTo="/login"
							/>
						}
					>
						<Route
							index
							element={<ProfilePage />}
						/>
					</Route>
				</Route>

				<Route
					path="/admin"
					element={
						<AuthGuard
							isAllow={session?.role === 'ADMIN'}
							redirectTo="/profile"
						>
							<AdminLayout />
						</AuthGuard>
					}
				>
					<Route
						index
						element={<p>Admin Dashboard</p>}
					/>
					<Route
						path="/admin/products"
						element={<p>Admin List products</p>}
					/>
					<Route
						path="/admin/users"
						element={<p>Admin List users</p>}
					/>
				</Route>
			</Routes>
		</Router>
	);
};

export default RouterManager;
