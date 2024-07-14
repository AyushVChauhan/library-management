import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import React, { useState } from 'react';
import { fetchPost } from '../../utils/fetch-utils';

const Librarian = () => {
	const [preview, setPreview] = useState(false);

	const [userDetails, setUserDetails] = useState({
		username: '',
		fullname: '',
		email: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(userDetails);
		try {
			let token = localStorage.getItem('token');
			const response = await fetchPost('admin/librarian', JSON.stringify(userDetails));
			console.log(response);
		} catch {}
	};

	const headerElement = (
		<div>
			<div className="text-3xl font-bold flex justify-center text-darkBlue">Librarian</div>
		</div>
	);
	return (
		<>
			<div className="flex justify-between items-center mb-5">
				<div className="text-4xl font-bold">Librarians</div>
				<Button
					onClick={() => {
						setPreview(true);
					}}
					className="bg-darkBlue border-0 rounded-md"
					label="ADD LIBRARIAN"
				/>
			</div>
			{preview && (
				<Dialog
					header={headerElement}
					visible={true}
					style={{ width: '35vw' }}
					draggable={false}
					onHide={() => setPreview(false)}
				>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor={`username`} className="block text-sm font-bold text-gray-600">
								Username
							</label>
							<InputText
								id={`username`}
								name="username"
								placeholder="Username"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => setUserDetails((prev) => ({ ...prev, username: e.target.value }))}
							/>
							<label htmlFor={`email`} className="block text-sm font-bold text-gray-600">
								Email
							</label>
							<InputText
								id={`email`}
								name="email"
								placeholder="Email"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value }))}
							/>
							<label htmlFor={`fullname`} className="block text-sm font-bold text-gray-600">
								Password
							</label>
							<InputText
								id={`fullname`}
								name="fullname"
								placeholder="Password"
								className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => setUserDetails((prev) => ({ ...prev, fullname: e.target.value }))}
							/>
						</div>
						<Button
							type="submit"
							className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300 mt-4"
						>
							Submit
						</Button>
					</form>
				</Dialog>
			)}
		</>
	);
};

export default Librarian;
