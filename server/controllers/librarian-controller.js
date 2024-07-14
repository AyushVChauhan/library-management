const bookModel = require('../models/books.models');
const { ok200 } = require('../utils/response-utils');
const { CustomError } = require('../utils/router-utils');

async function addBook(req, res, next) {
	const { isbn, quantity, genre } = req.body;
	const result = await fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn);
	const book = await result.json();
	if (book.totalItems == 0) throw new CustomError('Invalid ISBN');
	const myBook = book.items[0];
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

module.exports = { addBook, getBookFromIsbn, addBook };
