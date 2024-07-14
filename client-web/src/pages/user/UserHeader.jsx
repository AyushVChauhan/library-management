/* eslint-disable react/prop-types */

import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

function UserHeader({ toggleSidebar }) {
	const toast = useRef();

	return (
		<div className="w-screen h-[10vh] border-b shadow-lg flex flex-row items-center justify-center md:justify-normal relative">
			<Toast ref={toast} />
			<ConfirmDialog draggable={false} />
			<div className="absolute left-5 block md:hidden cursor-pointer" onClick={toggleSidebar}>
				<GiHamburgerMenu size={25} />
			</div>
			<div className="text-3xl text-black font-bold md:mx-5 cursor-pointer">Library</div>

			<div className="absolute right-5">
				<Button label="LOGIN" className="bg-darkBlue" onClick={() => window.open('/login', '_self')} />
			</div>
		</div>
	);
}
export default UserHeader;
