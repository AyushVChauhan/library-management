const mongoose = require('mongoose');
const rolesConstant = require('../constants/roles.constant');
const { CustomError } = require('../utils/router-utils');

const userSchema = new mongoose.Schema(
	{
		username: { type: String, trim: true, unique: true },
		fullname: { type: String, trim: true },
		email: { type: String, trim: true, unique: true },
		password: String,
		role: { type: String, enum: Object.values(rolesConstant), required: true },
		is_active: { type: Number, default: 1 },
		reset_token: String,
		token_expiry: Date,
		notification_token: String,
	},
	{ timestamps: true }
);

userSchema.post('save', (error, doc, next) => {
	console.log(error, doc, next);
	if (error.code === 11000) throw new CustomError(Object.keys(error.keyValue)[0] + ' is already taken!');
	next(error);
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
