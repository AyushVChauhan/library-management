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
import Genre from './pages/admin/Genre';
import BookUsage from './pages/admin/BookUsage';
import BookBorrowForm from './pages/librarian/BookBorrowForm';
import BookDetail from './pages/librarian/BookDetail';
import BookReturn from './pages/librarian/BookReturn';
import BookDashboard from './pages/user/BookDashboard';
import UserBookDetail from './pages/user/UserBookDetail';
import History from './pages/librarian/History';
import UserHistory from './pages/user/UserHistory';
import PaymentDue from './pages/user/PaymentDue';
import UserActivity from './pages/admin/UserActivity';
import UserAcivityPreview from './components/UserActivityPreview';
import Insights from './pages/admin/Insights';
const routes = createBrowserRouter([
	{
		path: '/',
		element: <UserHome />,
		errorElement: <ErrorElement />,
		children: [
			{
				path: '',
				element: <BookDashboard />,
			},
			{
				path: ':id',
				element: <UserBookDetail />,
			},
		],
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
				path: 'librarians',
				element: <Librarian />,
			},
			{
				path: 'genre',
				element: <Genre />,
			},
			{
				path: 'book-usage',
				element: <BookUsage />,
			},
			{
				path: 'user-activity',
				element: <UserActivity />,
			},
			{
				path: 'activity-preview/:id',
				element: <UserAcivityPreview />,
			},
			{
				path: 'insights',
				element: <Insights />,
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
			{
				path: 'book/:id',
				element: <BookDetail />,
			},

			{
				path: 'book/borrow/:id',
				element: <BookBorrowForm />,
			},
			{
				path: 'bookReturn',
				element: <BookReturn />,
			},
			{
				path: 'history',
				element: <History />,
			},
		],
	},
	{
		path: '/user',
		element: <Home />,
		loader: verifyLoader,
		errorElement: <ErrorElement />,
		children: [
			{ path: '', element: <BookDashboard /> },
			{ path: ':id', element: <UserBookDetail /> },
			{ path: 'history', element: <UserHistory /> },
			{ path: 'paymentDue', element: <PaymentDue /> },
		],
	},
	{
		path: '*',
		element: <ErrorElement />,
	},
]);
export default routes;
