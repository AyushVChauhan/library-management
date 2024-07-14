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
router.get('/genre', asyncRouteHandler(getGenre));

module.exports = router;
