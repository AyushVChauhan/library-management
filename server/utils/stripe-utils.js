const stripe = require('stripe')(process.env.STRIPE_API_SRECRET_KEY);
module.exports = stripe;
