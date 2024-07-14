const md5 = require('md5');
const genreModel = require('../models/genre.models');
const { default: mongoose, isValidObjectId } = require('mongoose');
const userModel = require('../models/users.models');
const { ok200 } = require('../utils/response-utils');
const borrowModel = require('../models/borrow.models');
const { CustomError } = require('../utils/router-utils');
const { randomBytes } = require('crypto');
const rolesConstant = require('../constants/roles.constant');
async function dashboard(req, res, next) {
	ok200(res, { count1: 100, count2: 200 });
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

module.exports = {
	dashboard,
	addGenre,
	getGenre,
	addLibrarian,
	getLibrarians,
	history,
	userActivity,
	getUsers,
};
