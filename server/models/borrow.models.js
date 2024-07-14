const { default: mongoose } = require('mongoose');

const borrowSchema = new mongoose.Schema(
	{
		book: { type: mongoose.SchemaTypes.ObjectId, ref: 'books' },
		user: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
		librarian: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
		due_date: Date,
		return_date: Date,
		due_payment: {
			status: Boolean,
			last_transaction: { type: mongoose.SchemaTypes.ObjectId, ref: 'transactions' },
		},
		penalty_amount: Number, //per day
	},
	{ timestamps: true }
);

const borrowModel = mongoose.model('borrows', borrowSchema);
module.exports = borrowModel;
