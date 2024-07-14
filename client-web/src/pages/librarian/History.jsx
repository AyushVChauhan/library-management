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
					borrowDate: new Date(ele.due_date).toLocaleDateString('en-US'),
					dueDate: new Date(ele.createdAt).toLocaleDateString('en-US'),
				}))
			);
		}
	};

	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'fullname', header: 'FulllName' },
		{ field: 'isbn', header: 'ISBN' },
		{ field: 'title', header: 'Title' },
		{ field: 'borrowDate', header: 'Borrow Date' },
		{ field: 'dueDate', header: 'Due Date' },
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
