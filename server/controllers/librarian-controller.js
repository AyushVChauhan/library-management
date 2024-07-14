const { isValidObjectId } = require('mongoose');
const bookModel = require('../models/books.models');
const { ok200 } = require('../utils/response-utils');
const { CustomError } = require('../utils/router-utils');
const genreModel = require('../models/genre.models');
const userModel = require('../models/users.models');
const borrowModel = require('../models/borrow.models');
const { default: mongoose } = require('mongoose');
const { sendMail } = require('../utils/mail-utils');

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

async function getBook(req, res, next) {
	const { bookId } = req.params;
	if (!isValidObjectId(bookId)) throw new CustomError('Invalid BookId');
	const book = await bookModel.findOne({ _id: bookId }).populate('genre');
	if (!book) throw new CustomError('Invalid BookId');
	ok200(res, book);
}

async function getBorrowBook(req, res, next) {
	const { bookId } = req.params;
	if (!isValidObjectId(bookId)) throw new CustomError('Invalid BookId');
	const book = await bookModel.findOne({ _id: bookId }).populate('genre').lean();
	if (!book) throw new CustomError('Invalid BookId');
	const borrows = await borrowModel.countDocuments({ book: book._id, return_date: { $exists: false } });
	book.quantity -= borrows;
	if (book.quantity < 0) book.quantity = 0;
	ok200(res, book);
}

async function borrowBook(req, res, next) {
	const { bookId } = req.params;
	const { due_date, username, penalty_amount } = req.body;
	if (!isValidObjectId(bookId)) throw new CustomError('Invalid BookId');
	if (!due_date || new Date(due_date) <= new Date() || !username || !penalty_amount)
		throw new CustomError('Bad Request!');

	const user = await userModel.findOne({ username });
	if (!user) throw new CustomError('Invalid user!!');

	const book = await bookModel.findOne({ _id: bookId });
	if (!book) throw new CustomError('Invalid BookId');

	const borrows = await borrowModel.countDocuments({ book: book._id, return_date: { $exists: false } });
	if (borrows >= book.quantity) throw new CustomError('Book unavailable');

	const userData = res.locals.userData;

	const borrow = new borrowModel({
		book: book._id,
		due_date: new Date(due_date),
		librarian: userData._id,
		penalty_amount,
		user: user._id,
	});
	await borrow.save();

	ok200(res);
}

async function userBorrows(req, res, next) {
	const { username } = req.params;
	const user = await userModel.findOne({ username: username });
	if (!user) {
		ok200(res, []);
		return;
	}
	const borrows = await borrowModel.find({ return_date: { $exists: false } }).sort({ due_date: 1 });
	ok200(res, borrows);
}

async function bookBorrows(req, res, next) {
	const { bookId } = req.params;
	if (!isValidObjectId(bookId)) throw new CustomError('Invalid BookID');
	const book = await bookModel.findOne({ _id: bookId });
	if (!book) throw new CustomError('Invalid book');
	const borrows = await borrowModel.find({ book: book._id });
	ok200(res, borrows);
}

async function sendPaymentRequest(req, res, next) {
	const { borrowId } = req.params;
	if (!isValidObjectId(borrowId)) throw new CustomError('Invalid Request');
	const borrow = await borrowModel.findOne({ _id: borrowId });
	borrow.can_pay = true;
	await borrow.save();
	await borrow.populate('user');
	await sendMail(borrow.user.email, 'Due date', 'Please pay the overdue penalty amount here!');
	ok200(res);
}

async function returnBook(req, res, next) {
	const { borrowId } = req.params;
	if (!isValidObjectId(borrowId)) throw new CustomError('Invalid Request');

	const today = new Date();
	const borrow = await borrowModel.findOne({ _id: borrowId });
	if (!borrow) throw new CustomError('Invalid BorrowId');

	if (borrow.due_date < today && !borrow.payment_status) throw new CustomError('Panalty not submitted');

	borrow.return_date = today;
	await borrow.save();
	ok200(res);
}

module.exports = {
	addBook,
	getBookFromIsbn,
	addBook,
	getBooks,
	borrowBook,
	getBook,
	userBorrows,
	bookBorrows,
	sendPaymentRequest,
	returnBook,
	getBorrowBook,
};
