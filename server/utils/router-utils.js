const fs = require('fs');
function asyncRouteHandler(handler) {
	return async (req, res, next) => {
		try {
			await handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}
class CustomError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.status = 'error';
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}
function interceptor(req, res, next) {
	// console.log(`ROUTE "${req.originalUrl}" INITIATED`);
	res.locals.startTime = Date.now();
	next();
}

/**
 * @param {Error} error
 */
async function errorHandler(error, req, res, next) {
	for (let index = 0; index < req.files?.length; index++) {
		const element = req.files[index];
		fs.rmSync(element.path);
	}
	if (req.file) {
		fs.rmSync(req.file.path);
	}
	const userData = res.locals.userData;
	if (userData?.username) {
		console.log('\x1b[34m%s\x1b[0m', userData?.username);
	}
	if (req.query) {
		console.log('QUERY:', JSON.stringify(req.query));
	}
	if (req.body) {
		console.log('BODY:', JSON.stringify(req.body));
	}
	if (error.stack) {
		console.log('STACK:', error.stack);
	}
	if (error.message) {
		console.log('MESSAGE:', error.message);
	}
	console.log('\n');
	res.status(error.statusCode || 400).json({ success: false, message: error.message });
}
module.exports = { CustomError, asyncRouteHandler, interceptor, errorHandler };
//Error code

// 1xx Informational
// 100	Continue
// 101	Switching protocols
// 102	Processing
// 103	Early Hints

// 2xx Succesful
// 200	OK
// 201	Created
// 202	Accepted
// 203 	Non-Authoritative Information
// 204	No Content
// 205	Reset Content
// 206	Partial Content
// 207	Multi-Status
// 208	Already Reported
// 226	IM Used

// 3xx Redirection
// 300	Multiple Choices
// 301	Moved Permanently
// 302	Found (Previously "Moved Temporarily")
// 303	See Other
// 304	Not Modified
// 305	Use Proxy
// 306	Switch Proxy
// 307	Temporary Redirect
// 308	Permanent Redirect

// 4xx Client Error
// 400	Bad Request
// 401	Unauthorized
// 402	Payment Required
// 403	Forbidden
// 404	Not Found
// 405	Method Not Allowed
// 406	Not Acceptable
// 407	Proxy Authentication Required
// 408	Request Timeout
// 409	Conflict
// 410	Gone
// 411	Length Required
// 412	Precondition Failed
// 413	Payload Too Large
// 414	URI Too Long
// 415	Unsupported Media Type
// 416	Range Not Satisfiable
// 417	Expectation Failed
// 418	I'm a Teapot
// 421	Misdirected Request
// 422	Unprocessable Entity
// 423	Locked
// 424	Failed Dependency
// 425	Too Early
// 426	Upgrade Required
// 428	Precondition Required
// 429	Too Many Requests
// 431	Request Header Fields Too Large
// 451	Unavailable For Legal Reasons

// 5xx Server Error
// 500	Internal Server Error
// 501	Not Implemented
// 502	Bad Gateway
// 503	Service Unavailable
// 504	Gateway Timeout
// 505	HTTP Version Not Supported
// 506	Variant Also Negotiates
// 507	Insufficient Storage
// 508	Loop Detected
// 510	Not Extended
// 511	Network Authentication Required
