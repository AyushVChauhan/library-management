const { storage } = require('../configs/firebase');
const { getDownloadURL } = require('firebase-admin/storage');
const fs = require('fs');

/**
 * deletes the local file if upload is successfull
 * @param {string} filePath path of file in local
 * @param {string} destination destination in cloud (eg: `uploads/abc.jpg`)
 * @returns {Promise<string>} url of the file
 */
async function uploadFile(filePath, destination) {
	const file = storage.file(destination);
	await storage.upload(filePath, {
		destination: destination,
		metadata: {
			contentType: 'auto', // Automatically determine content type
		},
	});
	const url = await getDownloadURL(file);
	fs.rmSync(filePath);
	return url;
}
module.exports = { uploadFile };
