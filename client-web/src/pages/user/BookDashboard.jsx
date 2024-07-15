import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-utils';
import Loading from '../../components/Loading';
import { Dropdown } from 'primereact/dropdown';
import BookCard from '../../components/BookCard';

function BookDashboard() {
	const toast = useRef(null);
	//const role = localStorage.getItem('role').toLowerCase();
	//const [dropdownValue, setDropdownValue] = useState('all');
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [trendingBooks, setTrendingBooks] = useState([]);
	const [newestArrivals, setNewestArrivals] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [loading, setLoading] = useState(true);

	const getData = async () => {
		const tb = await fetchGet('user/trending');
		const na = await fetchGet('user/newest');
		setTrendingBooks(tb.data);
		setNewestArrivals(na.data);
		setLoading(false);
	};

	useEffect(() => {
		getData();
	}, []);

	const handleSearch = async (e) => {
		const result = await fetchGet('user/books?search=' + searchInput);
		setSearchResults(result.data);
		setIsSearching(true);
		// e.preventDefault();
		// const url = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`;
		// try {
		// 	const response = await fetch(url);
		// 	const data = await response.json();
		// 	const books = data.items || [];
		// 	setSearchResults(books);
		// 	setIsSearching(true);
		// } catch (error) {
		// 	console.error('Error fetching books:', error);
		// }
	};

	const clearSearch = () => {
		setSearchInput('');
		setSearchResults([]);
		setIsSearching(false);
	};

	if (loading) return <Loading />;

	return (
		<>
			<Toast ref={toast} />
			<div className="p-4">
				<div className="flex flex-col md:flex-row gap-x-5">
					<div className="w-full">
						<h1 className="text-xl font-bold mb-4">Book Search</h1>
						<input
							type="text"
							value={searchInput}
							onChange={(e) => setSearchInput(e.target.value)}
							placeholder="Search for a book"
							className="py-2 px-4 border rounded-md w-full"
						/>
					</div>
				</div>
				<button
					onClick={handleSearch}
					className="py-2 text-white px-5 font-semibold text-xl rounded-md bg-blue-500 mb-5"
				>
					Search
				</button>
				{isSearching && (
					<button onClick={clearSearch} className="mb-6 py-2 px-4 bg-red-500 text-white rounded-md">
						Clear Search
					</button>
				)}

				{!isSearching && (
					<>
						<h2 className="text-2xl font-semibold mt-4 mb-2">New Arrival Books</h2>
						<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
							{newestArrivals.map((book, index) => (
								<BookCard key={index} book={book} />
							))}
						</div>

						<h2 className="text-2xl font-semibold mb-2">Trending Books</h2>
						<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{trendingBooks.map((book, index) => (
								<BookCard key={index} book={book} />
							))}
						</div>
					</>
				)}

				{isSearching && (
					<div>
						<h2 className="text-2xl font-semibold mb-2">Search Results</h2>
						<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{searchResults.map((book, index) => (
								<BookCard key={index} book={book} />
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default BookDashboard;
