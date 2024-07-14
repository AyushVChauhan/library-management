import { createBrowserRouter } from 'react-router-dom';
import { loginLoader, verifyLoader } from './loaders/verify-loader';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ErrorElement from './components/ErrorElement';
import Register from './pages/Register';
import Librarian from './pages/admin/Librarian';
import Books from './pages/librarian/Books';
import UserHome from './pages/user/UserHome';
const routes = createBrowserRouter([
	{
		path: '/',
		element: <UserHome />,
		errorElement: <ErrorElement />,
		// children: [
		// 	{
		// 		path: '',
		// 		element: <BookDashboard />,
		// 	},
		// 	{
		// 		path: 'book/:id',
		// 		element: <BookDetail />,
		// 	},
		// ],
	},
	{
		path: '/login',
		element: <Login />,
		loader: loginLoader,
	},
	{
		path: '/register',
		element: <Register />,
		loader: loginLoader,
	},
	{
		path: '/admin',
		element: <Home />,
		loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [
			{ path: '', element: <Dashboard /> },
			{
				path: 'librarian',
				element: <Librarian />,
			},
		],
	},
	{
		path: '/librarian',
		element: <Home />,
		loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [
			{ path: '', element: <Dashboard /> },
			{
				path: 'book',
				element: <Books />,
			},
		],
	},
	{
		path: '/user',
		element: <Home />,
		loader: verifyLoader,
		errorElement: <ErrorElement />,
		// children: [
		// 	{path:'', element: <BookDashboard />},
		// 	{path:'book/:id', element: <BookDetail />}
		// ]
	},
	{
		path: '*',
		element: <ErrorElement />,
	},
]);
export default routes;
