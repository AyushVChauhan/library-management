import React from 'react';

const BookCard = ({ book }) => {
	console.log(book);
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
				<button
					className="mt-4 rounded-lg bg-gray-900 py-2 px-4 text-white text-sm font-bold uppercase shadow-md hover:shadow-lg focus:opacity-85"
					type="button"
					onClick={() => navigate(`/book/${book._id}`)}
				>
					View Details
				</button>
			</div>
		</div>
	);
};

export default BookCard;
