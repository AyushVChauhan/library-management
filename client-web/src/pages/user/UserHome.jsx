/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useRef, useState } from 'react';
import SideBarLink from '../../components/SidebarLink';
import { Outlet } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Loading from '../../components/Loading';
import UserHeader from './UserHeader';
import { BiLogIn } from 'react-icons/bi';
function UserHome() {
	const [sideBar, setSideBar] = useState(window.innerWidth > 768);
	const [width, setWidth] = useState(window.innerWidth);
	const [loading, setLoading] = useState(true);
	const toast = useRef(null);

	async function checkLogin() {
		const token = localStorage.getItem('token');
		const role = localStorage.getItem('role');
		if (!token || !role) {
			setLoading(false);
			return;
		}
		if (role) {
			window.open('/' + role.toLowerCase(), '_self');
			return;
		}
		setLoading(false);
	}
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

		checkLogin();
		return () => {
			window.onresize = () => {};
			window.onoffline = () => {};
			window.ononline = () => {};
		};
	}, [toast]);

	if (loading) return <Loading />;

	return (
		<>
			<Toast ref={toast} />
			<UserHeader toggleSidebar={toggleSidebar} />
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
						<SideBarLink
							to={'/login'}
							name="Login"
							iconClass=<BiLogIn />
							end={false}
							toggleSidebarClick={
								width < 768
									? () => {
											toggleSidebar(false);
									  }
									: undefined
							}
						/>
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

export default UserHome;
