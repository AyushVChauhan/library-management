import React from 'react';
import { Toast } from 'primereact/toast';
import { useEffect, useState, useRef } from 'react';
import Datatable from '../components/Datatable';
import { redirect, useNavigate } from 'react-router-dom';

import { fetchGet } from '../utils/fetch-utils';
import { FaEye } from 'react-icons/fa';
const UserAcivityPreview = () => {
	const role = localStorage.getItem('role').toLowerCase();
	const [data, setData] = useState([]);
	const navigate = useNavigate();

	const getUser = async () => {
		const result = await fetchGet(role + `/genre`);

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
		getUser();
	}, []);
	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'username', header: 'Username' },
		{ field: 'email', header: 'Email' },
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
