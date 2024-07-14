import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

function UserHeader() {
	const toast = useRef();

	return (
		<div className="w-screen h-[10vh] border-b shadow-lg flex flex-row items-center justify-between md:justify-normal relative">
			<Toast ref={toast} />
			<ConfirmDialog draggable={false} />
			<div className="text-3xl text-black font-bold mx-2 md:mx-5 cursor-pointer">Library</div>

			<div className="absolute right-5">
				<Button label="LOGIN" className="bg-darkBlue" onClick={() => window.open('/login', '_self')} />
			</div>
		</div>
	);
}
export default UserHeader;