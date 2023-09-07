"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAckInterval = exports.ackAll = exports.ackAlarm = exports.endAll = exports.endAlarm = exports.addAlarm = exports.query = void 0;
const services_1 = require("../../services");
const services_2 = require("../../services");
const __1 = require("../");
const types_1 = require("../../types");
const dbName = 'tsDB';
const emitAlarm = 'alarm';
const jerusalemZone = 'Asia/Jerusalem';
function query() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_2.getCollection)(dbName, types_1.CollectionName.Alarm);
            let alarms = yield collection.find({}).sort({ startTime: -1 }).limit(4000).toArray();
            return alarms;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.query = query;
function addAlarm(towerName, fcId, typeAlarm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fc = yield __1.fcService.getById(towerName, fcId);
            const alarm = _createTempAlarm(towerName, fc, typeAlarm);
            let collection = yield (0, services_2.getCollection)(dbName, types_1.CollectionName.Alarm);
            yield collection.insertOne(alarm);
            services_1.socketService.emitRender(emitAlarm);
            services_1.socketService.emitRender(_getEmitFc(towerName, fc.floor));
            return alarm.id;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.addAlarm = addAlarm;
function endAlarm(alarmId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_2.getCollection)(dbName, types_1.CollectionName.Alarm);
            yield collection.updateOne({ id: alarmId, acknolage: false }, { $set: { activation: false, alarmStatus: 2, endTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }) } });
            yield collection.deleteOne({ id: alarmId, acknolage: true });
            services_1.socketService.emitRender(emitAlarm);
            return;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.endAlarm = endAlarm;
function endAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_2.getCollection)(dbName, types_1.CollectionName.Alarm);
            yield collection.updateMany({ acknolage: false }, { $set: { activation: false, alarmStatus: 2, endTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }) } });
            yield collection.deleteMany({ acknolage: true });
            services_1.socketService.emitRender(emitAlarm);
            return;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.endAll = endAll;
function ackAlarm(alarmId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_2.getCollection)(dbName, types_1.CollectionName.Alarm);
            yield collection.updateOne({ id: alarmId, activation: true }, { $set: { acknolage: true, alarmStatus: 3, ackTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }) } });
            yield collection.deleteOne({ id: alarmId, activation: false });
            services_1.socketService.emitRender(emitAlarm);
            return;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.ackAlarm = ackAlarm;
function ackAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_2.getCollection)(dbName, types_1.CollectionName.Alarm);
            yield collection.updateMany({ activation: true }, { $set: { acknolage: true, alarmStatus: 3, ackTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }) } });
            yield collection.deleteMany({ activation: false });
            services_1.socketService.emitRender(emitAlarm);
            return;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.ackAll = ackAll;
let intervalId;
function startAckInterval() {
    return __awaiter(this, void 0, void 0, function* () {
        if (intervalId)
            clearInterval(intervalId);
        intervalId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            yield ackAll();
            services_1.socketService.emitRender(emitAlarm);
        }), 30 * 60 * 1000);
    });
}
exports.startAckInterval = startAckInterval;
function _createTempAlarm(towerName, fc, typeAlarm) {
    const alarmDescription = typeAlarm === types_1.TypeAlarm.High
        ? types_1.AlarmDes.High
        : types_1.AlarmDes.Low;
    const alarm = {
        id: _makeId(12),
        fc: {
            towerName,
            id: fc.id
        },
        alarmStatus: 1,
        startTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }),
        activation: true,
        endTime: null,
        acknolage: false,
        ackTime: null,
        display: true,
        zone: towerName,
        family: 'AC',
        txt: `Tower ${towerName} floor ${+fc.floor.substring(2, 4)} - ${fc.description} - ${alarmDescription}`
    };
    return alarm;
}
function _makeId(length = 6) {
    let idText = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        var char = chars.charAt(Math.floor(Math.random() * (chars.length)));
        idText += char;
    }
    return idText;
}
function _getEmitFc(towerName, floor) {
    return `fcs-${towerName}-${floor}`;
}
