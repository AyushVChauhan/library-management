const { Socket } = require('socket.io');
/**
 * @type {{[key:string] : Socket }}
 */
const socketUserIds = {};

module.exports = socketUserIds;
