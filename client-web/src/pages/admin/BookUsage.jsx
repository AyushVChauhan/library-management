import React from 'react';

import { useEffect, useState } from 'react';


import Datatable from '../../components/Datatable';
import { useNavigate } from 'react-router-dom';

import { fetchGet } from '../../utils/fetch-utils';
const BookUsage = () => {
	const role = localStorage.getItem('role').toLowerCase();
	const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({});
	const navigate = useNavigate();

	const getBookInfo = async () => {
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
		getBookInfo();
      
	}, []);
	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'title', header: 'Book Name' },
		{ field: 'genre', header: 'Genre' },
		{ field: 'author', header: 'Author' },
		{ field: 'issuedby', header: 'Issued by' },
	];
	
	
	return (
		<>
			<div className="px-5 w-full">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">Book Insights</div>
                    
					
				</div>
				<Datatable data={data} array={datatableArray} />
			</div>
		</>
	);
};

export default BookUsage;
