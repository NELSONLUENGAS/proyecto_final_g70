import './App.css';
import { ProductsProvider } from './context/ProductsProvider';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';
import RouterManager from './router/RouterManager';

function App() {
	return (
		<AuthProvider>
			<ProductsProvider>
				<CartProvider>
					<RouterManager />
				</CartProvider>
			</ProductsProvider>
		</AuthProvider>
	);
}

export default App;
