/* eslint-disable no-undef */
const apiURL = import.meta.env.VITE_URL;

/**
 * Get Request to a particular route with Authorization header
 * @param {String} pathName After localhost:9999/
 * @param {String} token can be null
 * @returns Jsonified response
 */
export async function fetchGet(pathName, method = 'GET') {
	const token = localStorage.getItem('token');
	if (!navigator.onLine) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
	try {
		const request = await fetch(apiURL + pathName, {
			method,
			headers: { Authorization: 'Bearer ' + token },
		});
		if (request.status == 405) {
			localStorage.removeItem('role');
			localStorage.removeItem('token');
			window.open('/', '_self');
			return;
		}
		const response = await request.json();
		return response;
	} catch (error) {
		console.log(error);
		return { success: false, internet: true, message: 'Connection Issue' };
	}
}

/**
 * Post Request to a particular route with Authorization header
 * @param {String} pathName After localhost:9999/
 * @param {String} token can be null
 * @param {String} body Jsonified String
 * @returns Jsonified response
 */
export async function fetchPost(pathName, body, method = 'POST', contentType = 'application/json') {
	const token = localStorage.getItem('token');
	if (!navigator.onLine) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
	try {
		const request = await fetch(apiURL + pathName, {
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': contentType,
			},
			method,
			body,
		});
		if (request.status == 405) {
			localStorage.removeItem('role');
			localStorage.removeItem('token');
			window.open('/', '_self');
			return;
		}
		const response = await request.json();
		return response;
	} catch (error) {
		console.log(error);
		return { success: false, internet: true, message: 'Connection Issue' };
	}
}

export async function fetchUpload(pathName, body) {
	const token = localStorage.getItem('token');
	if (!navigator.onLine) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
	try {
		const request = await fetch(apiURL + pathName, {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			method: 'POST',
			body,
		});
		if (request.status == 405) {
			localStorage.removeItem('role');
			localStorage.removeItem('token');
			window.open('/', '_self');
			return;
		}
		const response = await request.json();
		return response;
	} catch (error) {
		return { success: false, internet: true, message: 'Connection Issue' };
	}
}
