const { default: mongoose } = require('mongoose');
const md5 = require('md5');
const userModel = require('../models/users.models');
async function dbConnect() {
	if (process.env.ENVIRONMENT == 'PRODUCTION') {
		await mongoose.connect(process.env.MONGODB_URI);
	}
	if (process.env.ENVIRONMENT == 'DEVELOPMENT') {
		await mongoose.connect(process.env.MONGODB_URI_DEVELOPMENT);
	}
}
async function addAdmin() {
	const admin = new userModel({
		email: 'abc@gmail.com',
		fullname: 'admindas',
		is_active: 1,
		password: md5('123'),
		username: 'admin',
		role: 'ADMIN',
	});
	await admin.save();
}
module.exports = { dbConnect, addAdmin };
