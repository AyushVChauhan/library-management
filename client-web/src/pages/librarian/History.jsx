import React, { useEffect, useState } from 'react';
import { fetchGet } from '../../utils/fetch-utils';
import Datatable from '../../components/Datatable';

const History = () => {
	const role = localStorage.getItem('role').toLowerCase();
	const [data, setData] = useState();

	const getHistory = async () => {
		const response = await fetchGet(`${role}/history`);
		if (response.success) {
			setData(
				response.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
					isbn: ele.book.isbn,
					title: ele.book.title,
					fullname: ele.user.fullname,
					borrowDate: new Date(ele.due_date).toLocaleDateString(),
					dueDate: new Date(ele.createdAt).toLocaleDateString(),
					is_returned: ele.return_date ? new Date(ele.return_date).toLocaleDateString() : 'Not Returned',
				}))
			);
		}
	};

	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'fullname', header: 'Full Name' },
		{ field: 'isbn', header: 'ISBN' },
		{ field: 'title', header: 'Title' },
		{ field: 'borrowDate', header: 'Due Date' },
		{ field: 'dueDate', header: 'Borrow Date' },
		{ field: 'is_returned', header: 'Returned on' },
	];

	useEffect(() => {
		getHistory();
	}, []);

	return (
		<>
			<div className="flex justify-between items-center">
				<div className="text-4xl font-bold text-darkBlue">History</div>
			</div>
			<Datatable array={datatableArray} data={data} />
		</>
	);
};

export default History;
