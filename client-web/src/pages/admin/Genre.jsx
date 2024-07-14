import React from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { useEffect,useState,useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Datatable from '../../components/Datatable';
import { useNavigate } from 'react-router-dom';

import { fetchGet,fetchPost } from '../../utils/fetch-utils';
const Genre = () => {
	const [genre,setGenre] = useState('');
	const toast = useRef();
	const role = localStorage.getItem('role').toLowerCase();
	const [modal, setModal] = useState(false);
	const [data,setData]=useState([]);
	const navigate = useNavigate();
 
	const getGenre = async () => {
		const result = await fetchGet(role+`/genre`);
		
		if (result.success) {
			setData(
				result.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
				}))
			);
		}
		else {
			navigate('/');
		}
	};
	console.log(genre);
	const addGenre = async ()=>{
		const response = await fetchPost(
			role + '/genre',
			
			JSON.stringify({'title':genre})
				
			
		);
		if (response.success) {
			setModal(false);
			
			getGenre();
			toast.current.show({
				severity: 'success',
				summary: 'Confirmed',
				detail: 'Institute Added successfully!',
				life: 3000,
			});
		}
	}
	const handleReset = () => {
		setModal(false);
	};


	useEffect(()=>{
		getGenre();
},[]);
const datatableArray = [
	{ field: 'index', header: 'Sr no.' },
	{ field: 'title', header: 'Genre Title' },
	
];
// const actionArray = [
// 	{
// 		icon: <FaTrash className="text-red-600" />,
// 		// onClick: (e) => {
// 		// 	confirmFunction(e);
// 		// },
// 	},
// ];
const footerContent = (
	<div>
		<Button
			className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-white hover:text-red-600 hover:border-red-600 hover:border-1 focus:outline-none focus:ring focus:border-blue-300 transition-all"
			variant="light"
			onClick={handleReset}
		>
			Close
		</Button>
		<Button
			type="submit"
			onClick={addGenre}
			className="py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300 transition-all"
		>
			Add
		</Button>
	</div>
);
	return (
		<>
			<Toast ref={toast} />
			<div className="px-5 w-full">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">Genre</div>
					<Button
						onClick={() => {
							setModal(true);
						}}
						className="transition-all  py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
					>
						ADD GENRE
					</Button>
				<Dialog
						visible={modal}
						modal
						onHide={() => setModal(false)}
						header="ADD MODAL"
						blockScroll
						className="w-full px-10 md:px-0 md:w-1/3"
						draggable={false}
						footer={footerContent}
					>
				<div>
				<form className="space-y-4">
				<InputText
							id={`title`}
							name="title"
							placeholder="Genre Title"
							className="border rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
							onChange={(e) => setGenre(e.target.value)  }
						/>
						</form>
				

					
				</div>
			</Dialog>
			</div>
			<Datatable data={data} array={datatableArray}  />

		</div>
		</>
	);
};

export default Genre;
