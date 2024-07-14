import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
	const role = localStorage.getItem('role').toLowerCase();
	const navigate = useNavigate();
	return (
		<div key={book._id} className="p-3 cursor-pointer shadow-md rounded-xl w-full bg-white">
			<div className="w-full overflow-hidden rounded-xl aspect-square">
				<img
					src={book.thumbnail || 'https://via.placeholder.com/150'}
					alt={book.title}
					className="w-full object-contain"
				/>
			</div>
			<div className="mt-3">
				<h5 className="text-2xl font-semibold text-darkBlue">{book.title}</h5>
				<p className="text-ellipsis line-clamp-2">
					{book.description ? book.description.slice(0, 100) + '...' : 'No description available.'}
				</p>
				<div className="mt-3 flex justify-center gap-5 p-5">
					<button
						className="bg-darkBlue text-white p-2 rounded-md border-0"
						type="button"
						onClick={() => navigate(`${book._id}`)}
					>
						View Details
					</button>
					<button
						className="bg-green-600 text-white p-2 rounded-md border-0"
						type="button"
						onClick={() => navigate(`borrow/${book._id}`)}
					>
						Borrow
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookCard;
