const { default: mongoose } = require('mongoose');

const transactionSchema = new mongoose.Schema(
	{
		paymentIntentId: {
			type: String,
			required: true,
			unique: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
const transactionModel = mongoose.model('transactions', transactionSchema);
module.exports = transactionModel;
