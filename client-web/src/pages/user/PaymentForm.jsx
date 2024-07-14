/* eslint-disable react/prop-types */
import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from 'primereact/button';

const PAYMENT_SUCESS_URL = import.meta.env.VITE_PAYMENT_SUCCESS_URL;

const PaymentForm = ({ amount }) => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) return;

		setIsLoading(true);
		setMessage('Payment in Progress');

		const resp = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: PAYMENT_SUCESS_URL,
			},
		});

		if (resp.error) setMessage('Some Error Occurred !!');
		setIsLoading(false);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<div>
						<h1 className="text-2xl text-center">Complete payment of {amount}$</h1>
						<PaymentElement />
						<div className="text-center mt-2">
							<Button
								loading={isLoading || !stripe || !elements}
								label="Pay Now"
								className="bg-darkBlue rounded-md"
							/>
						</div>
						{message && <div>{message}</div>}
					</div>
				</div>
			</form>
		</div>
	);
};

export default PaymentForm;
