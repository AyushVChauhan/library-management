import React, { useEffect, useRef, useState } from 'react';
import { fetchGet, fetchPost } from '../../utils/fetch-utils';
import Loading from '../../components/Loading';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';

function BookBorrowForm() {
	const id = '66935ce1d7f65c32c420bb0a';
	const role = localStorage.getItem('role').toLowerCase();
	const [loading, setLoading] = useState(true);
	const [bookData, setBookData] = useState([]);
	const [username, setUsername] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [fee, setFee] = useState('');
	const navigate = useNavigate();
	const toast = useRef(null);

	const getBookData = async () => {
		setLoading(true);
		const result = await fetchGet(`${role}/book/${id}`);
		if (result.success) {
			console.log(result.data);
			setBookData(result.data);
			setLoading(false);
		}
	};
	const handleChangeUsername = (e) => {
		setUsername(e.target.value);
	};
	const handleChangeFee = (e) => {
		setFee(e.target.value);
	};
	const handleSubmit = async () => {
		const result = await fetchPost(
			`${role}/borrow/${id}`,
			JSON.stringify({ due_date: dueDate, username, penalty_amount: fee })
		);
		if (result.success) {
			navigate('/librarian');
		}
	};
	useEffect(() => {
		getBookData();
	}, []);
	if (loading) return <Loading />;
	return (
		<>
			<Toast ref={toast} />
			<div className="px-10">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold">Book Borrow</div>
				</div>
				<div className="mb-3">
					<div className="flex flex-row">
						<div className="flex-column">
							<div className="flex">
								<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Book Title:</div>
								<div className="ms-2 mt-2">{bookData.title}</div>
							</div>
							<div className="flex">
								<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Book ISBN:</div>
								<div className="ms-2 mt-2">{bookData.isbn}</div>
							</div>
							<div className="flex">
								<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Description:</div>
								<div className="ms-2 mt-2 line-clamp-6">{bookData.description}</div>
							</div>
						</div>
						<div className="flex">
							<div className="w-60 overflow-hidden rounded-xl aspect-square mx-5 mt-2">
								<img src={`${bookData.thumbnail}`} className="w-full object-contain" alt=" Image" />
							</div>
						</div>
					</div>

					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Author(s):</div>
						<div className="ms-2 mt-2">{bookData.authors.join(', ')}</div>
					</div>

					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Genre:</div>
						<div className="ms-2 mt-2">{bookData.genre.title}</div>
					</div>
					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Year:</div>
						<div className="ms-2 mt-2">{bookData.year}</div>
					</div>
					<div className="flex">
						<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Quantity Available:</div>
						<div className="ms-2 mt-2">{bookData.quantity}</div>
					</div>
				</div>
				<Fieldset legend="Borrow Form">
					<div className="mb-2">
						<label htmlFor="username" className="block text-sm font-medium text-gray-600">
							Username
						</label>
						<InputText
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={handleChangeUsername}
							placeholder="Enter the username"
							className="w-1/2 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-300 focus:border-4"
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="duedate" className="block text-sm font-medium text-gray-600">
							Due Date
						</label>
						<Calendar
							value={dueDate}
							onChange={(e) => setDueDate(e.value)}
							className="w-1/2"
							placeholder="Enter the Due Date"
						/>
					</div>
					<div className="mb-2">
						<label htmlFor="fee" className="block text-sm font-medium text-gray-600">
							Penalty Fee for overdue
						</label>
						<InputText
							type="number"
							id="fee"
							name="fee"
							value={fee}
							onChange={handleChangeFee}
							min={1}
							placeholder="Enter the fee"
							className="w-1/2 mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-300 focus:border-4"
						/>
						<div className="text-sm">Fees will be increased by 10 everyday</div>
					</div>
					<Button
						color="primary"
						loading={loading}
						disabled={loading}
						onClick={handleSubmit}
						className="transition-all my-3 py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
					>
						ADD
					</Button>
				</Fieldset>
			</div>
		</>
	);
}

export default BookBorrowForm;
