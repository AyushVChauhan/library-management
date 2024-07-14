const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { asyncRouteHandler } = require('../utils/router-utils');
const { verify } = require('../controllers/common-controller');
const { dashboard, getGenre } = require('../controllers/admin-controller');
const librarianController = require('../controllers/librarian-controller');
const rolesConstant = require('../constants/roles.constant');

const router = express.Router();

router.use(authMiddleware(rolesConstant.LIBRARIAN));
router.get('/verify', asyncRouteHandler(verify));
router.get('/dashboard', asyncRouteHandler(dashboard));

router.get('/book/get/:isbn', asyncRouteHandler(librarianController.getBookFromIsbn));
router.post('/book', asyncRouteHandler(librarianController.addBook));
router.post('/book/edit/:bookId', asyncRouteHandler(librarianController.editBook));
router.get('/genre', asyncRouteHandler(getGenre));

router.get('/book', asyncRouteHandler(librarianController.getBooks));
router.get('/book/:bookId', asyncRouteHandler(librarianController.getBook));
router.get('/book/borrow/:bookId', asyncRouteHandler(librarianController.getBorrowBook));

router.post('/borrow/:bookId', asyncRouteHandler(librarianController.borrowBook));
router.get('/borrows/user/:username', asyncRouteHandler(librarianController.userBorrows));
router.get('/borrows/book/:bookId', asyncRouteHandler(librarianController.bookBorrows));

router.get('/history', asyncRouteHandler(librarianController.history));

router.get('/payment-request/:borrowId', asyncRouteHandler(librarianController.sendPaymentRequest));
router.get('/return/:borrowId', asyncRouteHandler(librarianController.returnBook));
module.exports = router;
