const { default: mongoose } = require('mongoose');

const genreSchema = new mongoose.Schema(
	{
		title: { type: String, unique: true },
	},
	{ timestamps: true }
);

const genreModel = mongoose.model('genres', genreSchema);
module.exports = genreModel;
