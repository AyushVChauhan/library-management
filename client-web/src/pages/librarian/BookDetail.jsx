import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-utils';
import Loading from '../../components/Loading';

const BookDetail = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const role = localStorage.getItem('role').toLowerCase();
	const [bookData, setBookData] = useState([]);
	const getBookData = async () => {
		setLoading(true);
		const result = await fetchGet(`${role}/book/${id}`);
		if (result.success) {
			console.log(result.data);
			setBookData(result.data);
			setLoading(false);
		}
	};
	useEffect(() => {
		getBookData();
	}, [id]);
	if (loading) return <Loading />;
	return (
		<>
			<div className="px-10">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold text-darkBlue">Book Details</div>
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
				<div className="flex">
					<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Description:</div>
					<div className="ms-2 mt-2 ">{bookData.description}</div>
				</div>
			</div>
		</>
	);
};

export default BookDetail;
