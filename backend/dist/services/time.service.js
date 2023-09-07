"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startTimeInterval = void 0;
const _1 = require("./");
const jerusalemZone = 'Asia/Jerusalem';
var gDate = new Date();
const startTimeInterval = () => {
    setInterval(() => {
        gDate = new Date();
        _1.socketService.emitTime(gDate.toLocaleTimeString('it-IT', { timeZone: jerusalemZone }), gDate.toLocaleDateString("en-GB", { timeZone: jerusalemZone }));
    }, 1000);
};
exports.startTimeInterval = startTimeInterval;
