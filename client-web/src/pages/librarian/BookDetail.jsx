import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGet } from '../../utils/fetch-utils';
import Loading from '../../components/Loading';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

const BookDetail = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const role = localStorage.getItem('role').toLowerCase();
	const [bookData, setBookData] = useState([]);
	const [modal, setModal] = useState(false);
	const [genre, setGenre] = useState('');
	const [quantity, setQuantity] = useState('');
	const [genreData, setGenreData] = useState([]);

	const getBookData = async () => {
		setLoading(true);
		const result = await fetchGet(`${role}/book/${id}`);
		if (result.success) {
			//console.log(result.data);
			setBookData(result.data);
			setGenre(bookData.genre.title);
			setQuantity(bookData.quantity);
			setLoading(false);
		}
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
	const handleChangeQuantity = (e) => {
		setQuantity(e.target.value);
	};
	const handleChangeGenre = (e) => {
		setGenre(e.target.value);
	};
	const handleSubmit = async () => {
		const result = await fetchPost(
			localStorage.getItem('role').toLowerCase() + '/book',
			JSON.stringify({ quantity, genre })
		);
		if (result.success) {
			handleReset();
		}
	};
	const handleReset = () => {
		setModal(false);
		setBookData('');
		setGenre('');
		setQuantity('');
	};
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
	useEffect(() => {
		getBookData();
	}, [id]);
	useEffect(() => {
		getGenreData();
	}, []);

	if (loading) return <Loading />;
	return (
		<>
			<div className="px-10">
				<div className="flex justify-between items-center">
					<div className="text-4xl font-bold text-darkBlue">Book Details</div>
					<Button
						onClick={() => {
							setModal(true);
						}}
						className="transition-all  py-2 px-4 bg-darkBlue text-white rounded-md hover:bg-white hover:text-darkBlue hover:border-darkBlue hover:border-1 focus:outline-none focus:ring focus:border-blue-300"
					>
						EDIT BOOK
					</Button>
				</div>
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
					</form>
				</Dialog>
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
			</div>
		</>
	);
};

export default BookDetail;
