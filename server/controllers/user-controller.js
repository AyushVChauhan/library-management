const { default: mongoose, isValidObjectId } = require('mongoose');
const bookModel = require('../models/books.models');
const borrowModel = require('../models/borrow.models');
const { ok200 } = require('../utils/response-utils');
const { CustomError } = require('../utils/router-utils');
const transactionModel = require('../models/transaction.model');
const stripe = require('stripe')(process.env.STRIPE_API_SRECRET_KEY);

async function trendingBooks(req, res, next) {
	const oneMonth = new Date(Date.now() - 2629800000);
	const borrows = await borrowModel.find({ createdAt: { $gt: oneMonth } }).lean();
	let bookMap = [];
	borrows.forEach((ele) => {
		const book = bookMap.find((e) => e.book == ele.book.toString());
		if (book) {
			book.count++;
		} else {
			bookMap.push({ book: ele.book.toString(), count: 1 });
		}
	});
	bookMap.sort((a, b) => a.count - b.count);
	bookMap = bookMap.filter((ele, index) => index < 10);
	const trending = await bookModel.find({
		_id: { $in: bookMap.map((ele) => new mongoose.Types.ObjectId(ele.book)) },
	});
	ok200(res, trending);
}

async function newestArrival(req, res, next) {
	const books = await bookModel.find({}).sort({ createdAt: -1 }).limit(10);
	ok200(res, books);
}
async function history(req, res, next) {
	const id = res.locals.userData._id;
	if (!isValidObjectId(id)) throw new CustomError('Invalid Request');
	let data = await borrowModel.find({ user: id }).populate('book').populate('transaction');
	ok200(res, data);
}

async function payOverdue(req, res, next) {
	const { borrowId } = req.params;
	if (!isValidObjectId(borrowId)) throw new CustomError('Invalid Request');

	const borrow = await borrowModel.findOne({ _id: borrowId });
	if (!borrow) throw new CustomError('Invalid Request');
	if (!borrow.can_pay) throw new CustomError('Cant pay now');

	const today = new Date();
	const dueDate = new Date(borrow.due_date);
	let amount = 0;

	if (today > dueDate) {
		const penaltyAmountPerDay = borrow.penalty_amount || 0;
		const daysLate = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)); // Calculate the number of days late
		const extraDayCharge = 10;
		amount = penaltyAmountPerDay + daysLate * extraDayCharge;
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount * 100,
		currency: 'usd',
		description: 'Overdue payment',
		automatic_payment_methods: {
			enabled: true,
		},
	});

	const transaction = new transactionModel({
		amount,
		currency: 'usd',
		paymentIntentId: paymentIntent.id,
		user: new mongoose.Types.ObjectId(res.locals.userData._id),
		status: 'PENDING',
		borrow: borrow._id,
	});

	await transaction.save();
	ok200(res, paymentIntent.client_secret);
}

module.exports = { trendingBooks, newestArrival, payOverdue, history };
