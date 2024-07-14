/* eslint-disable no-undef */
const apiURL = "http://192.168.1.7:3000/";

/**
 * Get Request to a particular route with Authorization header
 * @param {String} pathName After localhost:9999/
 * @param {String} token can be null
 * @returns Jsonified response
 */
export async function fetchGet(pathName, { token }, router = undefined) {
	try {
		const request = await fetch(apiURL + pathName, {
			method:"GET",
			headers: { Authorization: "Bearer " + token },
		});
		if (request.status == 405 && router) {
			router.replace("/logout");
			return;
		}
		const response = await request.json();
		return response;
	} catch (error) {
		console.log(error);
		return { success: false, internet: true, message: "Connection Issue" };
	}
}

/**
 * Post Request to a particular route with Authorization header
 * @param {String} pathName After localhost:9999/
 * @param {String} token can be null
 * @param {String} body Jsonified String
 * @returns Jsonified response
 */
export async function fetchPost(pathName, body, token = null, method = "POST", router = undefined) {
	try {
		const request = await fetch(apiURL + pathName, {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			method,
			body,
		});
		if (request.status == 405 && router) {
			router.replace("/logout");
			return;
		}
		const response = await request.json();
		return response;
	} catch (error) {
		console.log(error);
		return { success: false, internet: true, message: "Connection" };
	}
}

export async function fetchUpload(pathName, body) {
	const token = localStorage.getItem("token");
	if (!navigator.onLine) {
		return { success: false, internet: true, message: "Connection Issue" };
	}
	try {
		const request = await fetch(apiURL + pathName, {
			headers: {
				Authorization: "Bearer " + token,
			},
			method: "POST",
			body,
		});
		if (request.status == 405) {
			localStorage.removeItem("role");
			localStorage.removeItem("token");
			window.open("/", "_self");
			return;
		}
		const response = await request.json();
		return response;
	} catch (error) {
		return { success: false, internet: true, message: "Connection Issue" };
	}
}
