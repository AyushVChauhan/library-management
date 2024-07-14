const admin = require('firebase-admin');
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require('./google.json');
const app = initializeApp({
	credential: cert(serviceAccount),
	storageBucket: 'tryfcm-90140.appspot.com',
});
const storage = getStorage(app).bucket();
const message = admin.messaging();
module.exports = { storage, message };
