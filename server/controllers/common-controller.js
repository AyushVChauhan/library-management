const md5 = require('md5');
const { CustomError } = require('../utils/router-utils');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users.models');
const crypto = require('crypto');
const { passwordReset } = require('../utils/mail-utils');
const { ok200 } = require('../utils/response-utils');
const rolesConstant = require('../constants/roles.constant');
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function login(req, res, next) {
	const { role, username, password } = req.body;
	if (!role || !username || !password) {
		throw new CustomError('Invalid Request', 400);
	}

	const user = await userModel.findOne({ username, password: md5(password), role }).lean();
	if (!user) {
		throw new CustomError('Invalid Credentials', 400);
	}
	const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
	res.json({ success: true, data: { token, fullname: user.fullname } });
}

async function register(req, res, next) {
	const { username, fullname, password, email } = req.body;
	if (!username || !fullname || !password || !email) {
		throw new CustomError('Bad Request', 400);
	}

	const user = new userModel({
		email,
		fullname,
		password: md5(password),
		role: rolesConstant.USER,
		username,
	});
	await user.save();

	ok200(res);
}

async function updateNotificationToken(req, res) {
	const { token } = req.body;
	if (!token) throw new CustomError('Bad Request!', 400);
	const user = await userModel.findOne({ _id: res.locals.userData._id });
	if (!user) throw new CustomError('Bad Request!', 400);
	user.notification_token = token;
	await user.save();
	ok200(res);
}

async function verify(req, res, next) {
	res.json({ success: true, data: { ...res.locals.userData, iat: null, exp: null } });
}

async function sendToken(req, res, next) {
	const { username } = req.body;
	const randomBytes = crypto.randomBytes(59);
	let obj = await studentsModel.findOne({ username }, { _id: 1, email: 1, username: 1 });
	let type = 0;
	if (!obj) {
		obj = await teachersModel.findOne({ username }, { _id: 1, email: 1, username: 1 });
		type = 1;
	}
	if (!obj) {
		throw new CustomError('Invalid Username', 400);
	}
	obj.token_expiry = Date.now() + 10 * 60 * 1000;
	obj.reset_token = randomBytes.toString('hex') + type;
	await obj.save();
	await passwordReset(obj.username, obj.email, obj.reset_token);
	ok200(res);
}

async function resetPassword(req, res, next) {
	const { token, password } = req.body;
	console.log(token.length);
	if (token.length != 119 || (token[token.length - 1] != 0 && token[token.length - 1] != 1)) {
		throw new CustomError('Invalid Token', 400);
	}
	const type = token[token.length - 1];
	let obj;
	if (type == 0) {
		obj = await studentsModel.findOne({ reset_token: token });
	} else {
		obj = await teachersModel.findOne({ reset_token: token });
	}
	if (!obj) {
		throw new CustomError('Invalid Token', 400);
	}
	if (obj.token_expiry < res.locals.startTime) {
		throw new CustomError('Token expired', 400);
	}
	obj.reset_token = null;
	obj.token_expiry = null;
	obj.password = md5(password);
	await obj.save();
	ok200(res);
}

async function paymentSuccess(req, res, next) {
	console.log(req.query);
	ok200(res, req.query);
}

module.exports = { login, verify, register, updateNotificationToken, paymentSuccess };
