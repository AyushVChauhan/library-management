const { message } = require('../configs/firebase');

async function sendPushNotification({ token, body, title }) {
	// const options = {
	// 	message: {
	// 		token: token,
	// 		notification: {
	// 			body: body,
	// 			title: title,
	// 		},
	// 	},
	// };
	// const res = await fetch('https://fcm.googleapis.com/v1/projects/tryfcm-90140/messages:send', {
	// 	method: 'POST',
	// 	body: JSON.stringify(options),
	// 	headers: {
	// 		'Authorization':
	// 			'Bearer ' +
	// 			'AAAAluTMuOw:APA91bG-tWeAerRV9TViKoBTRMph08eb1CozkbTRD0wUi4HGPXAq8CFa9x0QaTRiosf_p-pqltCXlOZPcn1SyTgMWVZImiWHTQedrsUwnSM5GSFh33lYBqdvvVUjXszGjxOYkI-K5PnL',
	// 	},
	// });
	// console.log(res);

	const messageReq = {
		notification: {
			title,
			body,
		},
		token,
	};
	message
		.send(messageReq)
		.then((response) => {
			console.log('Successfully sent message:', response);
		})
		.catch((error) => {
			console.error('Error sending message:', error);
		});
}
module.exports = { sendPushNotification };
