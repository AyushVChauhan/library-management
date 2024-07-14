const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { asyncRouteHandler } = require('../utils/router-utils');
const { verify } = require('../controllers/common-controller');
const userController = require('../controllers/user-controller');
const rolesConstant = require('../constants/roles.constant');
const { getBooks, getBorrowBook } = require('../controllers/librarian-controller');
const { getGenre } = require('../controllers/admin-controller');

const router = express.Router();

router.get('/trending', asyncRouteHandler(userController.trendingBooks));
router.get('/newest', asyncRouteHandler(userController.newestArrival));
router.get('/books', asyncRouteHandler(getBooks));
router.get('/book/:bookId', asyncRouteHandler(getBorrowBook));
router.get('/genre', asyncRouteHandler(getGenre));

router.use(authMiddleware(rolesConstant.USER));
router.get('/verify', asyncRouteHandler(verify));
router.get('/pay/:borrowId', asyncRouteHandler(userController.payOverdue));
router.get('/history', asyncRouteHandler(userController.history));
router.get('/payments-due', asyncRouteHandler(userController.paymentsDue));
//trending
//new arrival
//request book
//filter books
//pay
module.exports = router;
