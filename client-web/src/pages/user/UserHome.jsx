import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Loading from '../../components/Loading';
import UserHeader from './UserHeader';
function UserHome() {
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
			<UserHeader />

			<div className="w-full h-full">
				<div className="flex flex-row h-[90vh] w-full">
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