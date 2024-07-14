import React from 'react';
import { Toast } from 'primereact/toast';
import { useEffect, useState, useRef } from 'react';
import Datatable from '../components/Datatable';
import { redirect, useNavigate, useParams } from 'react-router-dom';

import { fetchGet } from '../utils/fetch-utils';
import { FaEye } from 'react-icons/fa';
const UserAcivityPreview = () => {
	const role = localStorage.getItem('role').toLowerCase();
	const { id } = useParams();
	const [data, setData] = useState([]);
	const navigate = useNavigate();

	const getUser = async () => {
		const result = await fetchGet(role + `/userActivity/${id}`);

		if (result.success) {
			setData(
				result.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
					book: ele.book.title,
					author: ele.book.authors[0],
					borrowed: new Date(ele.createdAt).toLocaleDateString('en-US'),
					dueDate: new Date(ele.due_date).toLocaleDateString('en-US'),
				}))
			);
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		getUser();
	}, [id]);
	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'book', header: 'Book' },
		{ field: 'author', header: 'Author' },
		{ field: 'borrowed', header: 'Borrowed At' },
		{ field: 'dueDate', header: 'Due Date' },
	];
	// const actionArray = [
	// 	{
	// 		icon: <FaEye className="text-red-600" />,
	// 		onClick: (e) => {

	// 			redirect('/admin/activity-preview');

	// 		},
	// 	},
	// ];

	return (
		<>
			<div className="px-5 w-full">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">Activity Preview</div>
				</div>
				<Datatable data={data} array={datatableArray} />
			</div>
		</>
	);
};

export default UserAcivityPreview;
