/**
 * 
 * @param {import("express").Response} res 
 * @param {any} data 
 */
function ok200(res, data = null) {
	if (data) {
		res.status(200).json({ success: true, data: data });
	}
	else {
		res.status(200).json({ success: true });
	}
}
function err405(res) {
	res.status(405).json({ success: false });
}
module.exports = { ok200, err405 };