import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { fetchGet, fetchPost } from '../../utils/fetch-utils';

const BookReturn = () => {
	const role = localStorage.getItem('role');
	const [username, setUsername] = useState();
	const [data, setData] = useState([]);

	const handlSubmit = async () => {
		console.log(username);
		const response = await fetchGet(`${role}/borrows/user/${username}`);
		console.log(response);
	};
	return (
		<>
			<div className="px-10">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold text-darkBlue">Book Return </div>
				</div>
				<div className=" flex items-center justify-center">
					<div className="mt-5 w-1/2 flex items-center justify-center gap-5">
						<div className="w-full">
							<InputText
								id={`username`}
								name="username"
								placeholder="Username"
								className="border rounded-md px-3 py-2  w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="">
							<Button
								onClick={handlSubmit}
								type="button"
								className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300 "
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BookReturn;
