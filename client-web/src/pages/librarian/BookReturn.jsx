import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { fetchGet, fetchPost } from '../../utils/fetch-utils';
import Datatable from '../../components/Datatable';
import { FaCheckCircle } from 'react-icons/fa';

const BookReturn = () => {
	const role = localStorage.getItem('role');
	const [username, setUsername] = useState([]);
	const [data, setData] = useState();

	const handlSubmit = async () => {
		const response = await fetchGet(`${role}/borrows/user/${username}`);
		if (response.success) {
			setData(
				response.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
					isbn: ele.book.isbn,
					title: ele.book.title,
					fullname: ele.user.fullname,
					borrowDate: new Date(ele.due_date).toLocaleDateString('en-US'),
					dueDate: new Date(ele.createdAt).toLocaleDateString('en-US'),
				}))
			);
			console.log(data);
		}
	};
	const actionArray = [
		{
			icon: <FaCheckCircle className="text-darkBlue" size={20} />,
			onClick: (e) => {
				// /return/:borrowId
				console.log(e);
			},
		},
	];

	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'fullname', header: 'FulllName' },
		{ field: 'isbn', header: 'ISBN' },
		{ field: 'title', header: 'Title' },
		{ field: 'borrowDate', header: 'Borrow Date' },
		{ field: 'dueDate', header: 'Due Date' },
	];

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
				<Datatable array={datatableArray} action={actionArray} data={data} />
			</div>
		</>
	);
};

export default BookReturn;
