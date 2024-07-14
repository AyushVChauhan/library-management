import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import StandardErrorBoundary from './components/StandardErrorBoundary';

function App() {
	return (
		<StandardErrorBoundary>
			<RouterProvider router={routes} />
		</StandardErrorBoundary>
	);
}

export default App;
