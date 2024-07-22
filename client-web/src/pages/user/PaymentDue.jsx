import { useEffect, useState } from 'react';
import { fetchGet } from '../../utils/fetch-utils';
import Datatable from '../../components/Datatable';
import { FaPaypal } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Dialog } from 'primereact/dialog';
import PaymentForm from './PaymentForm';
const stripe = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentDue = () => {
	const [payments, setPayments] = useState([]);
	const [clientSecret, setClientSecret] = useState(null);
	const [amount, setAmount] = useState(0);
	const [modal, setModal] = useState(false);
	const options = {
		clientSecret,
		theme: 'stripe',
	};
	const getData = async () => {
		const result = await fetchGet('user/payments-due');
		console.log(result);
		if (result.success)
			setPayments(
				result.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
					createdAt: new Date(ele.createdAt).toLocaleDateString(),
					due_date: new Date(ele.due_date).toLocaleDateString(),
				}))
			);
	};
	useEffect(() => {
		getData();
	}, []);

	const datatableArray = [
		{ field: 'index', header: 'Sr no.' },
		{ field: 'book.isbn', header: 'ISBN' },
		{ field: 'book.title', header: 'Title' },
		{ field: 'createdAt', header: 'Borrow Date' },
		{ field: 'due_date', header: 'Due Date' },
	];

	const doPayment = async (e) => {
		const result = await fetchGet('user/pay/' + e);
		setAmount(result.data.amount);
		setClientSecret(result.data.client_secret);
		setModal(true);
	};

	const actionArray = [
		{
			icon: <FaPaypal className="text-blue-500" />,
			onClick: (e) => {
				doPayment(e._id);
			},
		},
	];

	return (
		<div>
			<div className="text-3xl font-bold">Payments Due</div>
			<Datatable data={payments} array={datatableArray} action={actionArray} />

			<Dialog
				visible={modal}
				modal
				onHide={() => setModal(false)}
				header={`COMPLETE PAYMENT OF ${amount}$`}
				className="w-2/3 md:w-1/3"
				blockScroll
				draggable={false}
			>
				<Elements stripe={stripe} options={options}>
					<PaymentForm></PaymentForm>
				</Elements>
			</Dialog>
		</div>
	);
};

export default PaymentDue;
