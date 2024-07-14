import { useEffect, useState } from 'react';
import { fetchGet } from '../../utils/fetch-utils';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';

function UserBookDetail() {
	const { id } = useParams();

	const [loading, setLoading] = useState(true);
	const [bookData, setBookData] = useState(null);
	const getBookData = async () => {
		setLoading(true);
		const result = await fetchGet(`user/book/${id}`);
		if (result.success) {
			console.log(result.data);
			setBookData(result.data);
			setLoading(false);
		}
	};
	useEffect(() => {
		getBookData();
	}, []);

	if (loading) return <Loading />;

	return (
		<>
			<div className="mb-3 mt-2">
				<div className="flex flex-row">
					<div className="flex-column w-3/4">
						<div className="flex">
							<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Book Title:</div>
							<div className="ms-2 mt-2">{bookData.title}</div>
						</div>
						<div className="flex">
							<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Book ISBN:</div>
							<div className="ms-2 mt-2">{bookData.isbn}</div>
						</div>
						<div className="flex">
							<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Author(s):</div>
							<div className="ms-2 mt-2">{bookData.authors && bookData.authors.join(', ')}</div>
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
							<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Available:</div>
							<div className="ms-2 mt-2">{bookData.quantity > 0 ? 'AVAILABLE' : 'NOT AVAILABLE'}</div>
						</div>
					</div>
					<div className="flex">
						<div className="w-48 overflow-hidden rounded-xl aspect-square mx-5 mt-2">
							<img src={`${bookData.thumbnail}`} className="w-full object-contain" alt=" Image" />
						</div>
					</div>
				</div>
			</div>
			<div className="flex">
				<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Description:</div>
				<div className="ms-2 mt-2 ">{bookData.description}</div>
			</div>
		</>
	);
}

export default UserBookDetail;
