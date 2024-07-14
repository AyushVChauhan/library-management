import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Datatable from '../../components/Datatable';
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-utils';
import { FaEye } from 'react-icons/fa';
const UserActivity = () => {
	const role = localStorage.getItem('role').toLowerCase();
	const [data, setData] = useState([]);
	const navigate = useNavigate();
	const [chartData, setChartData] = useState({});

	const getUsers = async () => {
		const result = await fetchGet(role + `/userActivity`);

		if (result.success) {
			setData(
				result.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
				}))
			);
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		getUsers();
	}, []);
	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'username', header: 'Username' },
		{ field: 'email', header: 'Email' },
	];
	const actionArray = [
		{
			icon: <FaEye className="text-red-600" />,
			onClick: (e) => {
				console.log(e);
				navigate(`/admin/activity-preview/${e._id}`);
			},
		},
	];

	return (
		<>
			<div className="px-5 w-full">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">User Activity</div>
				</div>
				<Datatable data={data} array={datatableArray} action={actionArray} />
			</div>
		</>
	);
};

export default UserActivity;
