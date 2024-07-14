import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useRef, useState } from 'react';
import { fetchGet, fetchPost } from '../../utils/fetch-utils';
import Datatable from '../../components/Datatable';
import { FaCheckCircle, FaPaypal } from 'react-icons/fa';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
const headerStyle = {
	backgroundColor: '#002865',
	color: 'white',
	textAlign: 'center',
};

const cellStyle = {
	border: '1px solid #dddddd',
	textAlign: 'left',
	padding: '8px',
	width: 'fit-content',
};
const BookReturn = () => {
	const role = localStorage.getItem('role');
	const [username, setUsername] = useState([]);
	const [data, setData] = useState();
	const toast = useRef(null);

	const handlSubmit = async () => {
		const response = await fetchGet(`${role}/borrows/user/${username}`);
		if (response.success) {
			setData(
				response.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
					createdAt: new Date(ele.createdAt).toLocaleDateString(),
					due_date: new Date(ele.due_date).toLocaleDateString(),
				}))
			);
		}
	};
	const accept = async (data) => {
		const result = await fetchGet('librarian/payment-request/' + data);
		if (result.success) {
			toast.current.show({
				severity: 'success',
				summary: 'Confirmed',
				detail: 'Returned Succesfully',
				life: 3000,
			});
			//getData();
		} else {
			toast.current.show({
				severity: 'info',
				summary: 'Error',
				detail: 'There was a Technical error',
				life: 3000,
			});
		}
	};
	const accept1 = async (data) => {
		const result = await fetchGet('librarian/return/' + data);
		if (result.success) {
			handlSubmit();
		} else {
			toast.current.show({
				severity: 'info',
				summary: 'Error',
				detail: 'There was a Technical error',
				life: 3000,
			});
		}
	};
	const confirm2 = (data) => {
		confirmDialog({
			message: 'Are you sure payment is done',
			header: 'Payment Confirmation',
			icon: 'pi pi-info-circle',
			defaultFocus: 'accept',
			acceptClassName: 'p-button-danger',
			accept: () => {
				accept(data);
			},
		});
	};
	const confirm1 = (data) => {
		confirmDialog({
			message: 'Are you sure you want to return?',
			header: 'Return Confirmation',
			icon: 'pi pi-info-circle',
			defaultFocus: 'accept',
			acceptClassName: 'p-button-danger',
			accept: () => {
				accept1(data);
			},
		});
	};
	const sendPaymentRequest = async (e) => {
		confirm2(e);
		//await fetchGet('librarian/payment-request/' + e);
	};

	const returnBook = async (e) => {
		confirm1(e);
		//await fetchGet('librarian/return/' + e);
		//handlSubmit();
	};

	const actionComponent = (
		<Column
			header="Action"
			key={'Action'}
			headerStyle={headerStyle}
			bodyStyle={cellStyle}
			body={(data) => {
				if (new Date(data.due_date) < new Date()) {
					return <FaPaypal onClick={() => sendPaymentRequest(data._id)} />;
				} else {
					return <FaCheckCircle onClick={() => returnBook(data._id)} />;
				}
			}}
		/>
	);

	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'user.fullname', header: 'Full name' },
		{ field: 'book.isbn', header: 'ISBN' },
		{ field: 'book.title', header: 'Title' },
		{ field: 'createdAt', header: 'Borrow Date' },
		{ field: 'due_date', header: 'Due Date' },
	];

	return (
		<>
			<Toast ref={toast} />
			<div className="px-10">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold text-darkBlue">Book Return </div>
				</div>
				<div className=" flex items-center justify-center">
					<div className="mt-5 w-1/2 flex items-center justify-center gap-5">
						<div className="w-full">
							<InputText
								id={`username`}
								name="username"
								placeholder="Username"
								className="border rounded-md px-3 py-2  w-full focus:outline-none focus:ring focus:border-blue-300"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="">
							<Button
								onClick={handlSubmit}
								type="button"
								className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300 "
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
				<Datatable array={datatableArray} extraComponent={actionComponent} data={data} />
			</div>
		</>
	);
};

export default BookReturn;
