/* eslint-disable react/prop-types */
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import { useEffect, useRef } from 'react';
import { FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { messaging } from '../firebase/firebase-config';
import { getToken, onMessage } from 'firebase/messaging';
import { Toast } from 'primereact/toast';
import { fetchPost } from '../utils/fetch-utils';
import socket from '../utils/socket-utils';

function Header({ toggleSidebar }) {
	const username = localStorage.getItem('username');
	const navigate = useNavigate();
	const menuLeft = useRef(null);
	const toast = useRef();
	const requestPermission = async () => {
		const permission = await Notification.requestPermission();
		const token = await getToken(messaging, {
			vapidKey: 'BKnX64RPaQ9h90BB67MY1KO8Fv_8NwOiYdcnxDGWjIEPPaQYSZhZFqPsFogddpgCml15Lt5MR6SNroTKiYQXL0k',
		});
		if (permission !== 'granted') {
			toast.current.show({
				severity: 'warn',
				summary: 'Notification Access',
				detail: 'Please give notification permission',
				life: 3000,
			});
			return;
		}
		updateToken(token);
	};
	const updateToken = async (token) => {
		await fetchPost('notification-token', localStorage.getItem('token'), JSON.stringify({ token }));
	};
	useEffect(() => {
		if (Notification.permission !== 'granted') {
			toast.current.show({
				severity: 'warn',
				summary: 'Notification Access',
				detail: 'Please give notification permission',
				life: 3000,
			});
		}
		const sub = onMessage(messaging, (payload) => {
			console.log(payload);
			toast.current.show({
				severity: 'info',
				summary: payload.notification.title,
				detail: payload.notification.body,
				life: 3000,
			});
		});
		socket.auth = { token: localStorage.getItem('token') };
		console.log('CONNECTING');
		socket.connect();
		return () => {
			sub();
			socket.disconnect();
		};
	}, []);

	const items = [
		{
			label: localStorage.getItem('role'),
			items: [
				{
					label: 'Notifications',
					icon: 'pi pi-bell',
					command: () => {
						requestPermission();
					},
				},
				{
					label: 'Reset Password',
					icon: 'pi pi-key',
					command: () => {
						navigate('/forgot-password');
					},
				},
				{
					label: 'Logout',
					icon: 'pi pi-power-off',
					command: () => {
						localStorage.clear();
						navigate('/');
					},
				},
			],
		},
	];
	return (
		<div className="w-screen h-[10vh] border-b shadow-lg flex flex-row items-center justify-center md:justify-normal relative">
			<Toast ref={toast} />
			<ConfirmDialog draggable={false} />
			<div className="absolute left-5 block md:hidden cursor-pointer" onClick={toggleSidebar}>
				<GiHamburgerMenu size={25} />
			</div>
			<div className="text-3xl text-black font-bold md:mx-5 cursor-pointer">Odoo</div>

			<div className="absolute right-5">
				<a className="flex flex-row items-center cursor-pointer" onClick={(e) => menuLeft.current.toggle(e)}>
					<div className="mx-2 flex items-center font-semibold md:text-xl">
						<FaUser className="me-2 my-1 md:text-xl" />
						<span className="md:block hidden">{username}</span>
					</div>
				</a>
				<Menu model={items} popup ref={menuLeft} id="popup_menu_right" popupAlignment="left" />
			</div>
		</div>
	);
}

export default Header;
