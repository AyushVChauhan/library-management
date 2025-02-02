const md5 = require('md5');
const genreModel = require('../models/genre.models');
const { default: mongoose, isValidObjectId } = require('mongoose');
const userModel = require('../models/users.models');
const { ok200 } = require('../utils/response-utils');
const borrowModel = require('../models/borrow.models');
const { CustomError } = require('../utils/router-utils');
const { randomBytes } = require('crypto');
const rolesConstant = require('../constants/roles.constant');
const bookModel = require('../models/books.models');
const { sendMail } = require('../utils/mail-utils');
async function dashboard(req, res, next) {
	const userCount = await userModel.countDocuments({ role: 'USER' });
	const librarianCount = await userModel.countDocuments({ role: 'LIBRARIAN' });
	const genreCount = await genreModel.countDocuments();
	const bookCount = await bookModel.countDocuments();
	const issueCount = await borrowModel.countDocuments();

	ok200(res, { userCount, librarianCount, genreCount, bookCount, issueCount });
}

async function addGenre(req, res, next) {
	const { title } = req.body;
	if (!title) throw new CustomError('Invalid Request!!');
	const genre = new genreModel({ title });
	await genre.save();
	ok200(res);
}

async function getGenre(req, res, next) {
	const genres = await genreModel.find({});
	ok200(res, genres);
}

async function addLibrarian(req, res, next) {
	const { username, email, fullname } = req.body;
	if (!username || !email || !fullname) throw new CustomError('Invalid Request');
	const password = randomBytes(5).toString();
	const librarian = new userModel({
		email,
		username,
		password: md5(password),
		is_active: 1,
		role: rolesConstant.LIBRARIAN,
		fullname,
	});
	await librarian.save();
	await sendMail(email, 'Registered Successfully', `username is ${username} password is ${password}`);
	ok200(res);
}

async function getLibrarians(req, res, next) {
	const librarians = await userModel.find({ is_active: 1, role: rolesConstant.LIBRARIAN });
	ok200(res, librarians);
}

async function history(req, res, next) {
	let data = await borrowModel.find().populate('book').populate('user').populate('transaction');
	ok200(res, data);
}
async function userActivity(req, res, next) {
	const { id } = req.params;
	console.log(id);
	if (!isValidObjectId(id)) throw new CustomError('Invalid Request');
	let data = await borrowModel.find({ user: id }).populate('book').populate('transaction');
	ok200(res, data);
}
async function getUsers(req, res, next) {
	let data = await userModel.find({ role: 'USER' });
	ok200(res, data);
}
async function bookAnalysis(req, res, next) {
	const books = await bookModel.find({}).lean();
	for (let index = 0; index < books.length; index++) {
		const element = books[index];
		element.borrow_count = await borrowModel.countDocuments({ book: element._id });
	}
	ok200(res, books);
}
module.exports = {
	dashboard,
	addGenre,
	getGenre,
	addLibrarian,
	getLibrarians,
	history,
	userActivity,
	getUsers,
	bookAnalysis,
};
