import { useState } from 'react';
import { fetchPost } from '../utils/fetch-utils';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const roles = ['USER', 'ADMIN'];

function Login() {
	const [role, setRole] = useState(roles[0]);
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const login = async () => {
		setLoading(true);
		const result = await fetchPost('login', JSON.stringify({ role, password, username }));
		setLoading(false);
		if (result.success) {
			setError('');
			localStorage.setItem('token', result.data.token);
			localStorage.setItem('username', username);
			localStorage.setItem('role', role);
			navigate('/' + role.toLowerCase());
		} else {
			setError(result.message);
		}
	};
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
				<div className="text-3xl text-center text-darkBlue font-semibold mb-6">LOGIN</div>
				<div className="space-y-4">
					<div>
						<label htmlFor="role" className="block text-sm font-medium text-gray-600">
							Select Role
						</label>
						<select
							id="role"
							value={role}
							onChange={(e) => setRole(e.target.value)}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300"
						>
							{roles.map((ele) => (
								<option key={ele} value={ele}>
									{ele}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-gray-600">
							Username
						</label>
						<input
							type="text"
							id="username"
							placeholder="Enter your username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-600">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300"
						/>
					</div>
					{error && <div className="text-red-600 text-center">{error}</div>}
					<Button
						onClick={login}
						className="w-full py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
						loading={loading}
						label="Login"
						raised
					/>
					<div className="text-end text-darkBlue font-medium">
						<Link to={'/register'}>Register</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
