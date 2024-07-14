const express = require('express');
const { authMiddleware } = require('../middlewares/auth-middleware');
const { asyncRouteHandler } = require('../utils/router-utils');
const { verify } = require('../controllers/common-controller');
const { dashboard } = require('../controllers/admin-controller');
const rolesConstant = require('../constants/roles.constant');

const router = express.Router();

router.use(authMiddleware(rolesConstant.USER));
router.get('/verify', asyncRouteHandler(verify));
router.get('/dashboard', asyncRouteHandler(dashboard));

//trending
//new arrival
//request book
//filter books

module.exports = router;
