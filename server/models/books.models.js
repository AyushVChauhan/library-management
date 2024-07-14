const { default: mongoose } = require('mongoose');

const bookSchema = new mongoose.Schema({
	isbn: { type: String, unique: true },
	title: String,
	description: String,
	thumbnail: String,
	authors: [String],
	publisher: String,
	year: String,
	quantity: Number,
	genre: { type: mongoose.SchemaTypes.ObjectId, ref: 'genres' },
	details: mongoose.SchemaTypes.Mixed,
});
const bookModel = mongoose.model('books', bookSchema);
module.exports = bookModel;
