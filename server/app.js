require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const morgan = require('morgan');
const http = require('node:http');

const { asyncRouteHandler, errorHandler } = require('./utils/router-utils');
const { login, register, updateNotificationToken } = require('./controllers/common-controller');
const { dbConnect, addAdmin } = require('./utils/database-utils');
const adminRoutes = require('./routes/admin-routes');
const librarianRoutes = require('./routes/librarian-routes');
const { authMiddleware } = require('./middlewares/auth-middleware');
const { uploadFile } = require('./utils/upload-utils');
const { sendPushNotification } = require('./utils/push-notifications-utils');
const { sendMail } = require('./utils/mail-utils');

const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: { origin: ['http://localhost:5173', 'http://localhost:4173'], credentials: true },
});

app.use(cors({ maxAge: 3600 }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(express.static('public'));

app.post('/login', asyncRouteHandler(login));
app.post('/register', asyncRouteHandler(register));
app.post('/notification-token', authMiddleware(undefined), asyncRouteHandler(updateNotificationToken));

app.use('/admin', adminRoutes);
app.use('/librarian', librarianRoutes);
// app.use('/user', userRoutes);
// app.post('/forgot-password', asyncRouteHandler(sendToken));
// app.post('/reset-password', asyncRouteHandler(resetPassword));

app.all('*', (req, res, next) => {
	next({ message: 'Invalid Route', stack: 'app.js' });
});
app.use(errorHandler);

startServer();
io.use((socket, next) => {
	try {
		user = jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET);
		socket.user = user;
		next();
	} catch (err) {
		console.log('BAD TOKEN');
	}
});

io.on('connection', async (socket) => {
	let currentRoom = null;
	let user = socket.user;
	if (!user) return;

	console.log(`${Date.now()}: user logged in ${user.username} \n`);
	socket.onAnyOutgoing((event, ...args) => {
		console.log(`${Date.now()}: sent event ${event}, ${JSON.stringify(args)} \n`);
	});

	socketUserIds[user._id] = socket;
});

async function startServer() {
	await dbConnect();
	// await addAdmin();
	// console.log(await uploadFile('./configs/google.json', 'google.json'));
	// await sendPushNotification({ token: 'ADSAD', body: 'HELLO', title: 'HELLO TITLE' });
	// await sendMail('avcthehero2@gmail.com', 'TEST MAIL', 'TESTING');
	app.listen(port, () => {
		console.log('http://localhost:' + port);
	});
}
