import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';

function Books() {
	const role = localStorage.getItem('role').toLowerCase();

	const [loading, setLoading] = useState(true);
	const [isbn, setIsbn] = useState('');
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();
	const toast = useRef(null);
	const handleChange = (e) => {
		console.log(e.target.value);
	};
	const handleSubmit = () => {};

	const footerContent = (
		<div>
			<Button
				color="danger"
				variant="light"
				//onClick={handleReset}
				className="transition-all py-2 px-4 bg-red-600 text-white rounded-md hover:bg-white hover:text-red-600 hover:border-red-600 hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
			>
				CLOSE
			</Button>
			<Button
				color="primary"
				type="submit"
				loading={loading}
				disabled={loading}
				onClick={handleSubmit}
				className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
			>
				ADD
			</Button>
		</div>
	);
	return (
		<>
			<Toast ref={toast} />
			{loading && <Loading />}

			<div className="px-10">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">Books</div>
					<Button
						onClick={() => {
							setModal(true);
						}}
						className="transition-all  py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
					>
						ADD BOOK
					</Button>
					<Dialog
						visible={modal}
						modal
						onHide={() => setModal(false)}
						header="ADD BOOK"
						className="w-2/3 md:w-1/3"
						blockScroll
						footer={footerContent}
						draggable={false}
					>
						<form>
							<div>
								<label htmlFor="isbn" className="block text-sm font-medium text-gray-600">
									ISBN
								</label>
								<InputText
									type="text"
									id="isbn"
									name="isbn"
									value={isbn}
									onChange={handleChange}
									placeholder="Enter the ISBN"
									className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-300 focus:border-4"
								/>
							</div>
						</form>
					</Dialog>
				</div>
			</div>
		</>
	);
}

export default Books;
