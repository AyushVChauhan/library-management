const { ok200 } = require('../utils/response-utils');
async function dashboard(req, res, next) {
	ok200(res, { count1: 100, count2: 200 });
}

module.exports = {
	dashboard,
};
