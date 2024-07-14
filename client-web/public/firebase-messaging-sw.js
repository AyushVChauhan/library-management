// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
	apiKey: 'AIzaSyD6z4vduaKmQZHns15hmXMAuR3USJxv9J8',
	authDomain: 'tryfcm-90140.firebaseapp.com',
	projectId: 'tryfcm-90140',
	storageBucket: 'tryfcm-90140.appspot.com',
	messagingSenderId: '648083716332',
	appId: '1:648083716332:web:cc2cf41a27d6ee462ccdc9',
	measurementId: 'G-PTD65F0N8N',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// Customize notification here
	// const notificationTitle = payload.notification.title;
	// const notificationOptions = {
	// 	body: payload.notification.body,
	// 	icon: '/firebase-logo.png',
	// };
	// console.log(notificationOptions);
	// self.registration.showNotification(notificationTitle, notificationOptions);
});
