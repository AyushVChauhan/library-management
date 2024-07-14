const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { asyncRouteHandler } = require('../utils/router-utils');
const { verify } = require('../controllers/common-controller');
const adminController = require('../controllers/admin-controller');
const rolesConstant = require('../constants/roles.constant');

const router = express.Router();

router.use(authMiddleware(rolesConstant.ADMIN));
router.get('/verify', asyncRouteHandler(verify));
router.get('/dashboard', asyncRouteHandler(adminController.dashboard));

router.post('/genre', asyncRouteHandler(adminController.addGenre));
router.get('/genre', asyncRouteHandler(adminController.getGenre));

router.post('/librarian', asyncRouteHandler(adminController.addLibrarian));
router.get('/librarian', asyncRouteHandler(adminController.getLibrarians));

router.get('/history', asyncRouteHandler(adminController.history));

module.exports = router;
