import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
	const items1 = [
		{ label: <Link to="/login">Login</Link>, key: 'login' },
		{ label: <Link to="/register">Register</Link>, key: 'register' },
		{ label: <Link to="/profile">Profile</Link>, key: 'profile' },
	];

	const items = [
		{ title: <Link to="/">Home</Link> },
		{ title: <Link to="/list">List</Link> },
		{ title: <Link to="/app">App</Link> },
	];

	const items2 = [
		{ label: 'Filter 1', key: '1' },
		{ label: 'Filter 2', key: '2' },
		{ label: 'Filter 3', key: '3' },
	];

	const logoStyle = {
		display: 'flex',
		alignItems: 'center',
		marginRight: 'auto', // Alinea el logo a la izquierda
	};

	return (
		<Layout className="min-h-screen">
			<Header
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between', // Alinea elementos en extremos
				}}
			>
				<div style={logoStyle}>
					{/* Reemplaza esto con tu logo */}
					<img
						src="/logo.png"
						alt="Logo"
						style={{ height: 40 }}
					/>
				</div>
				<Menu
					theme="dark"
					mode="horizontal"
					items={items1}
					style={{
						flex: 1,
						justifyContent: 'flex-end', // Alinea los enlaces a la derecha
					}}
				/>
			</Header>
			<Content
				style={{
					padding: '0 48px',
					minHeight: '100vh', // Asegura que el contenido tenga una altura mínima del 100%
				}}
			>
				<Breadcrumb
					style={{
						margin: '16px 0',
					}}
					items={items}
				/>
				<Layout
					style={{
						padding: '24px 0',
						background: '#f0f2f5', // Cambia esto por el color que prefieras
					}}
				>
					<Sider
						style={{
							background: '#ffffff', // Color de fondo del sider
						}}
						width={200}
					>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							style={{
								height: '100%',
							}}
							items={items2}
						/>
					</Sider>
					<Content
						style={{
							padding: '0 24px',
							minHeight: 100, // Asegura que el contenido tenga una altura mínima de 100
							background: '#ffffff', // Fondo del contenido principal
							borderRadius: '8px', // Bordes redondeados
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Content>
			<Footer
				style={{
					textAlign: 'center',
					backgroundColor: '#001529', // Cambia el color del fondo del footer
					color: 'white', // Color del texto
					padding: '24px 0', // Añadir padding para un mejor espaciado
					fontSize: '14px', // Ajustar tamaño de fuente
				}}
			>
				<div style={{ marginBottom: '8px' }}>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</div>
				<div>
					<a
						href="/"
						style={{ color: 'white', marginRight: '15px' }}
					>
						Home
					</a>
					<a
						href="/"
						style={{ color: 'white', marginRight: '15px' }}
					>
						About Us
					</a>
					<a
						href="/"
						style={{ color: 'white' }}
					>
						Contact
					</a>
				</div>
			</Footer>
		</Layout>
	);
};

export default MainLayout;
