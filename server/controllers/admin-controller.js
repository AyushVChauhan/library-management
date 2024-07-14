const md5 = require('md5');
const genreModel = require('../models/genre.models');
const userModel = require('../models/users.models');
const { ok200 } = require('../utils/response-utils');
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

module.exports = {
	dashboard,
	addGenre,
	getGenre,
	addLibrarian,
	getLibrarians,
};
