import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
	apiKey: 'AIzaSyD6z4vduaKmQZHns15hmXMAuR3USJxv9J8',
	authDomain: 'tryfcm-90140.firebaseapp.com',
	projectId: 'tryfcm-90140',
	storageBucket: 'tryfcm-90140.appspot.com',
	messagingSenderId: '648083716332',
	appId: '1:648083716332:web:cc2cf41a27d6ee462ccdc9',
	measurementId: 'G-PTD65F0N8N',
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging };
