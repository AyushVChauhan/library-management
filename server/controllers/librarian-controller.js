const { isValidObjectId } = require('mongoose');
const bookModel = require('../models/books.models');
const { ok200 } = require('../utils/response-utils');
const { CustomError } = require('../utils/router-utils');
const genreModel = require('../models/genre.models');

async function addBook(req, res, next) {
	const { isbn, quantity, genre } = req.body;
	if (!isValidObjectId(genre) || !isbn || !quantity) throw new CustomError('Invalid Request');
	const result = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
	const book = await result.json();
	if (book.totalItems == 0) throw new CustomError('Invalid ISBN');
	const myBook = book.items[0];
	const genreDoc = await genreModel.findOne({ _id: genre });
	if (!genreDoc) throw new CustomError('Invalid Genre');
	const newBook = new bookModel({
		authors: myBook.volumeInfo.authors,
		description: myBook.volumeInfo.description,
		details: myBook,
		isbn,
		thumbnail: myBook.volumeInfo.imageLinks.thumbnail,
		title: myBook.volumeInfo.title,
		year: new Date(myBook.volumeInfo.publishedDate),
		quantity,
		genre,
	});

	await newBook.save();
	ok200(res);
}

async function getBookFromIsbn(req, res, next) {
	const { isbn } = req.params;
	const result = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
	const book = await result.json();
	console.log(book);
	if (book.totalItems == 0) throw new CustomError('Invalid ISBN');
	const myBook = book.items[0];
	const newBook = {
		authors: myBook.volumeInfo.authors,
		description: myBook.volumeInfo.description,
		details: myBook,
		isbn,
		thumbnail: myBook.volumeInfo.imageLinks.thumbnail,
		title: myBook.volumeInfo.title,
	};
	ok200(res, newBook);
}

async function getBooks(req, res, next) {
	const { search, genre } = req.query;

	const filter = search
		? {
				$or: [
					{ isbn: new RegExp(search, 'i') },
					{ title: new RegExp(search, 'i') },
					{ description: new RegExp(search, 'i') },
					{ authors: { $in: [new RegExp(search, 'i')] } },
					{ publisher: new RegExp(search, 'i') },
					{ year: new RegExp(search, 'i') },
				],
		  }
		: {};
	let book = await bookModel.find(filter).populate('genre');
	if (book && genre) book = book.filter((ele) => ele.genre.title == genre);
	ok200(res, book);
}

module.exports = { addBook, getBookFromIsbn, addBook, getBooks };
