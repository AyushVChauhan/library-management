/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

function SideBarLink({ name, iconClass, to, end = true, toggleSidebarClick = () => {} }) {
	const handleLogout = () => {
		localStorage.clear();
	};

	return (
		<>
			{name === 'Logout' ? (
				<NavLink
					to={to}
					end={end}
					onClick={handleLogout}
					draggable={false}
					className={(props) => {
						return (
							'select-none w-full h-16 flex flex-row items-center ps-5 font-semibold text-xl cursor-pointer transition-all ' +
							(props.isActive
								? 'bg-white text-darkBlue'
								: 'text-white hover:bg-white hover:text-darkBlue')
						);
					}}
				>
					<div className="me-2">{iconClass}</div>
					<div>{name}</div>
				</NavLink>
			) : (
				<NavLink
					to={to}
					end={end}
					onClick={toggleSidebarClick}
					draggable={false}
					className={(props) => {
						return (
							'select-none w-full h-16 flex flex-row items-center ps-5 font-semibold text-xl cursor-pointer transition-all ' +
							(props.isActive
								? 'bg-white text-darkBlue'
								: 'text-white hover:bg-white hover:text-darkBlue')
						);
					}}
				>
					<div className="me-2">{iconClass}</div>
					<div>{name}</div>
				</NavLink>
			)}
		</>
	);
}

export default SideBarLink;
