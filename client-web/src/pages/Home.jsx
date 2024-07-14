/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import SideBarLink from '../components/SidebarLink';
import { Outlet } from 'react-router-dom';
import { MdGroups, MdSpaceDashboard } from 'react-icons/md';
import { FaSchool, FaBook, FaSwatchbook, FaUser } from 'react-icons/fa';
import { PiChalkboardTeacherFill, PiStudentFill } from 'react-icons/pi';
import { MdOutlineMenuBook } from 'react-icons/md';
import { BiBookContent, BiLogOut } from 'react-icons/bi';
import { FaFileCircleQuestion } from 'react-icons/fa6';
import { PiExamFill } from 'react-icons/pi';
import { TbCalendarTime } from 'react-icons/tb';
import { LuCalendarCheck2, LuHistory } from 'react-icons/lu';
import { Toast } from 'primereact/toast';
function Home() {
	const [sideBar, setSideBar] = useState(window.innerWidth > 768);
	const [width, setWidth] = useState(window.innerWidth);
	const toast = useRef(null);
	const sideBarLinks = useMemo(() => {
		return {
			ADMIN: [
				{
					to: '/admin',
					iconClass: <MdSpaceDashboard />,
					name: 'Dashboard',
				},
				{
					to: '/admin/genre',
					iconClass: <FaSwatchbook />,
					name: 'Genre',
				},
				{
					to: '/admin/librarians',
					iconClass: <FaUser />,
					name: 'Librarians',
				},
				{
					to: '/admin/book-usage',
					iconClass: <FaUser />,
					name: 'Book Usage',
				},
				{
					to: '/admin/user-activity',
					iconClass: <FaUser />,
					name: 'User Activity',
				},
				{
					to: '/',
					iconClass: <BiLogOut />,
					name: 'Logout',
				},
			],
			'LIBRARIAN': [
				{
					to: '/librarian',
					iconClass: <MdSpaceDashboard />,
					name: 'Dashboard',
				},
				{
					to: '/librarian/book',
					iconClass: <MdOutlineMenuBook />,
					name: 'Books',
				},
				{
					to: '/',
					iconClass: <BiLogOut />,
					name: 'Logout',
				},
			],
			'DEPARTMENT-HEAD': [
				{
					to: '/department-head',
					iconClass: <MdSpaceDashboard />,
					name: 'Dashboard',
				},
				{
					to: '/department-head/students',
					iconClass: <PiStudentFill />,
					name: 'Students',
				},
				{
					to: '/department-head/groups',
					iconClass: <MdGroups />,
					name: 'Groups',
				},
				{
					to: '/',
					iconClass: <BiLogOut />,
					name: 'Logout',
				},
			],
			'TEACHER': [
				{
					to: '/teacher',
					iconClass: <MdSpaceDashboard />,
					name: 'Dashboard',
				},
				// {
				// 	to: '/teacher/students',
				// 	iconClass: <PiStudentFill />,
				// 	name: 'Students',
				// },
				{
					to: '/teacher/modules',
					iconClass: <FaBook />,
					name: 'Modules',
				},
				{
					to: '/teacher/topics',
					iconClass: <BiBookContent />,
					name: 'Topics',
					end: false,
				},
				{
					to: '/teacher/questions',
					iconClass: <FaFileCircleQuestion />,
					name: 'Questions',
					end: false,
				},
				{
					to: '/teacher/quiz',
					iconClass: <PiExamFill />,
					name: 'Quizzes',
					end: false,
				},
				{
					to: '/',
					iconClass: <BiLogOut />,
					name: 'Logout',
				},
			],
			'STUDENT': [
				{
					to: '/student',
					iconClass: <MdSpaceDashboard />,
					name: 'Dashboard',
				},

				{
					to: '/student/upcomingQuiz',
					iconClass: <TbCalendarTime />,
					name: 'Upcoming Quiz',
				},
				{
					to: '/student/availableQuiz',
					iconClass: <LuCalendarCheck2 />,
					name: 'Available Quiz',
					end: false,
				},
				{
					to: '/student/history',
					iconClass: <LuHistory />,
					name: 'History',
					end: false,
				},
				{
					to: '/',
					iconClass: <BiLogOut />,
					name: 'Logout',
				},
			],
		};
	}, []);

	function toggleSidebar(val) {
		val ? setSideBar(val) : setSideBar((prev) => !prev);
	}
	useEffect(() => {
		window.onoffline = () => {
			// console.log('offline');
			toast.current.show({
				severity: 'error',
				summary: 'Connection issue',
				detail: 'It looks like you are offline!!',
				sticky: true,
			});
		};
		window.ononline = () => {
			toast.current.clear();
		};

		window.onresize = () => {
			setWidth(window.innerWidth);
			if (window.innerWidth > 768) setSideBar(true);
			if (window.innerWidth < 768) setSideBar(false);
		};
		return () => {
			window.onresize = () => {};
			window.onoffline = () => {};
			window.ononline = () => {};
		};
	}, [toast]);

	return (
		<>
			<Toast ref={toast} />
			<Header toggleSidebar={toggleSidebar} />
			<div
				onClick={() => {
					toggleSidebar(false);
				}}
				className={`${
					sideBar && width < 768 ? 'block' : 'hidden'
				} top-0 absolute w-screen h-screen bg-black opacity-30 z-10 overflow-hidden`}
			></div>
			<div className="w-full h-full">
				<div className="flex flex-row h-[90vh] w-full">
					<div
						className="bg-darkBlue absolute md:static top-0 left-0 md:top-auto h-screen md:h-full overflow-y-auto transition-all z-20 shadow-blue-500 shadow-xl"
						style={{ left: sideBar ? 0 : -300, minWidth: 224 }}
					>
						{localStorage.getItem('role') &&
							sideBarLinks[localStorage.getItem('role')].map((ele) => {
								return (
									<SideBarLink
										to={ele.to}
										name={ele.name}
										iconClass={ele.iconClass}
										key={ele.name}
										end={ele.end}
										toggleSidebarClick={
											width < 768
												? () => {
														toggleSidebar(false);
												  }
												: undefined
										}
									/>
								);
							})}
					</div>
					<div
						className={`overflow-y-auto bg-grey-100 w-full h-full p-2 md:p-7 bg-slate-50 pb-20 md:pb-5 ${
							width < 768 ? '' : 'flexcalc'
						}`}
					>
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
