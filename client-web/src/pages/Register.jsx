import { Button } from 'primereact/button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPost } from '../utils/fetch-utils';

function Register() {
	const [username, setUsername] = useState('');
	const [error, setError] = useState('');
	const [password, setPassword] = useState('');
	const [fullname, setFullname] = useState('');
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const register = async () => {
		setLoading(true);
		const result = await fetchPost('register', JSON.stringify({ username, fullname, password, email }));
		if (result.success) {
			navigate('/');
		} else {
			setError(result.message);
		}
		setLoading(false);
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
				<div className="text-3xl text-center text-darkBlue font-semibold mb-6">REGISTER</div>
				<div className="space-y-4">
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
						<label htmlFor="fullname" className="block text-sm font-medium text-gray-600">
							Fullname
						</label>
						<input
							type="text"
							id="fullname"
							placeholder="Enter your fullname"
							value={fullname}
							onChange={(e) => setFullname(e.target.value)}
							className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300"
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-600">
							Email
						</label>
						<input
							type="email"
							id="email"
							placeholder="Enter your Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
						onClick={register}
						className="w-full py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
						loading={loading}
						label="Register"
						raised
					/>
					<div className="text-end text-darkBlue font-medium">
						<Link to={'/'}>Login</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
