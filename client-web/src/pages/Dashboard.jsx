/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../utils/fetch-utils';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

import { FaChalkboardTeacher, FaRegCalendarCheck, FaRegCalendarPlus, FaSchool } from 'react-icons/fa';
import { PiChalkboardTeacherFill, PiStudentBold } from 'react-icons/pi';
import { MdOutlineMenuBook } from 'react-icons/md';

import CountCard from '../components/Dashboard/CountCard';
import { LuCalendarCheck2, LuCalendarClock } from 'react-icons/lu';
import { TbCalendarTime } from 'react-icons/tb';

function Dashboard() {
	const role = localStorage.getItem('role').toLowerCase();
	const [count, setCount] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const getData = async () => {
		const result = await fetchGet(role + '/dashboard');
		if (result.success) {
			let data = {
				'ADMIN': [
					{
						label: 'User',
						count: result.data.userCount,
						iconClass: <FaSchool size={25} />,
					},
					{
						label: 'Librarian',
						count: result.data.librarianCount,
						iconClass: <FaChalkboardTeacher size={25} />,
					},
					{
						label: 'Genre',
						count: result.data.genreCount,
						iconClass: <PiStudentBold size={25} />,
					},
					{
						label: 'Books',
						count: result.data.bookCount,
						iconClass: <FaSchool size={25} />,
					},
					{
						label: 'Issued Books',
						count: result.data.issueCount,
						iconClass: <FaSchool size={25} />,
					},
				],
				'LIBRARIAN': [
					{
						label: 'Books',
						count: result.data.bookCount,
						iconClass: <MdOutlineMenuBook size={25} />,
					},
					{
						label: 'Issued Books',
						count: result.data.issueCount,
						iconClass: <PiChalkboardTeacherFill size={25}></PiChalkboardTeacherFill>,
					},
					{
						label: 'Overdue Books',
						count: 0,
						iconClass: <MdOutlineMenuBook size={25} />,
					},
				],
			};
			setCount(data);
		} else {
			navigate('/');
		}
		setLoading(false);
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{loading && <Loading />}
			<div className="text-4xl px-10 font-bold py-1">Dashboard</div>

			<div className="flex overflow-hidden flex-wrap justify-evenly">
				{count &&
					count[localStorage.getItem('role')].map((ele, ind) => {
						return <CountCard key={ind} label={ele.label} iconClass={ele.iconClass} count={ele.count} />;
					})}
			</div>
		</>
	);
}

export default Dashboard;
