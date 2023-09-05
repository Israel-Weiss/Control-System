"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitTime = exports.emitRender = exports.setupSocketAPI = void 0;
var gIo;
function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*'
        }
    });
    console.log('setupSocketAPI');
    gIo.on('connection', (socket) => {
        console.log(`New connected socket ${socket.id}`);
        socket.on('disconnect', () => {
            console.log(`Socket is leaving`);
        });
    });
}
exports.setupSocketAPI = setupSocketAPI;
function emitRender(type) {
    gIo.emit(type);
}
exports.emitRender = emitRender;
function emitTime(date, time) {
    gIo.emit('time', { date, time });
}
exports.emitTime = emitTime;
