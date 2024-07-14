import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { fetchGet, fetchPost } from '../../utils/fetch-utils';
import { Dropdown } from 'primereact/dropdown';
import BookCard from '../../components/BookCard';

function Books() {
	const role = localStorage.getItem('role').toLowerCase();
	const [loading, setLoading] = useState(true);
	const [books, setBooks] = useState([]);
	const [isbn, setIsbn] = useState('');
	const [modal, setModal] = useState(false);
	const [data, setData] = useState('');
	const [bookData, setBookData] = useState(false);
	const [genreData, setGenreData] = useState([]);
	const [genre, setGenre] = useState('');
	const [quantity, setQuantity] = useState('');
	const [filter, setFilter] = useState();
	const navigate = useNavigate();
	const toast = useRef(null);

	const getBooks = async () => {
		const response = await fetchGet(`${role}/book`);
		if (response.success) {
			setBooks(response.data);
		}
		console.log(books);
	};

	const getGenreData = async () => {
		setLoading(true);
		const result = await fetchGet(role + '/genre');
		if (result.success) {
			//console.log(result.data);
			setGenreData(
				result.data.map((ele, ind) => ({
					...ele,
					index: ind + 1,
				}))
			);
			setLoading(false);
		}
	};
	const handleChange = (e) => {
		setIsbn(e.target.value);
	};
	const handleChangeQuantity = (e) => {
		setQuantity(e.target.value);
	};
	const handleChangeGenre = (e) => {
		setGenre(e.target.value);
	};
	const handleReset = () => {
		setModal(false);
		setIsbn('');
		setBookData('');
		setGenre('');
		setQuantity('');
	};
	const handleSubmit = async () => {
		if (bookData) {
			const result = await fetchPost(
				localStorage.getItem('role').toLowerCase() + '/book',
				JSON.stringify({ isbn, quantity, genre })
			);
			if (result.success) {
				handleReset();
			}
		} else {
			const result = await fetchGet(`${role}/book/get/${isbn}`);
			if (result.success) {
				console.log(result);
				setData(result.data);
				setBookData(true);
			} else {
				navigate('/');
			}
		}
	};

	const filterBooks = async () => {
		const result = await fetchGet(`${role}/book?search=${filter}`);
		console.log(result);
		if (result.success) {
			setBooks(result.data);
		}
	};

	useEffect(() => {
		getGenreData();
		getBooks();
	}, []);

	const footerContent = (
		<div>
			<Button
				color="danger"
				variant="light"
				onClick={handleReset}
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
						onHide={() => handleReset()}
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
									disabled={bookData}
									onChange={handleChange}
									placeholder="Enter the ISBN"
									className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-300 focus:border-4"
								/>
							</div>

							{bookData && (
								<>
									<div>
										<div className="flex">
											<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">
												Book Title:
											</div>
											<div className="ms-2 mt-2">{data.title}</div>
										</div>
										<div className="flex">
											<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">
												Description:
											</div>
											<div className="ms-2 mt-2 line-clamp-6">{data.description}</div>
										</div>
										<div className="flex">
											<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">Author:</div>
											<div className="ms-2 mt-2">{data.authors[0]}</div>
										</div>
										<div className="flex">
											<div className="ms-2 mt-2 font-xl font-semibold text-darkBlue">
												Thumbnail:
											</div>
											<div className="w-60 overflow-hidden rounded-xl aspect-square mx-5 mt-2">
												<img
													src={`${data.thumbnail}`}
													className="w-full object-contain"
													alt=" Image"
												/>
											</div>
										</div>
									</div>
									<div className="mb-2">
										<label htmlFor="genre" className="block text-sm font-bold text-gray-600">
											Select Genre
										</label>
										<Dropdown
											id="genre"
											value={genre}
											name="genre"
											onChange={handleChangeGenre}
											options={genreData}
											optionValue="_id"
											optionLabel="title"
											required
											placeholder="Select a genre"
											className="w-full md:w-14rem"
										/>
									</div>
									<div>
										<label htmlFor="isbn" className="block text-sm font-medium text-gray-600">
											Quantity
										</label>
										<InputText
											type="number"
											id="quantity"
											name="quantity"
											value={quantity}
											onChange={handleChangeQuantity}
											min={1}
											className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-300 focus:border-4"
										/>
									</div>
								</>
							)}
						</form>
					</Dialog>
				</div>
			</div>
			<div className="flex items-center justify-center my-5">
				<div className="mt-5 flex items-center justify-center w-1/2 gap-5">
					<div className="w-full">
						<InputText
							id={`search`}
							onChange={(e) => {
								setFilter(e.target.value);
							}}
							name="search"
							placeholder="Search"
							className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
						/>
					</div>
					<div>
						<Button
							onClick={filterBooks}
							type="button"
							className="transition-all py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300 "
						>
							Submit
						</Button>
					</div>
				</div>
			</div>

			<div className="p-5">
				<div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{books &&
						books.map((ele) => {
							return <BookCard key={ele._id} book={ele} />;
						})}
				</div>
			</div>
		</>
	);
}

export default Books;
