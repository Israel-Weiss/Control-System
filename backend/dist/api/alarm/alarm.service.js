"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const socketService = __importStar(require("../../services/socket.service"));
const db_service_1 = require("../../services/db.service");
const fcService = __importStar(require("../fc/fc.service"));
const dbName = 'tsDB';
function query() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, db_service_1.getCollection)(dbName, 'alarm');
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
            const fc = yield fcService.getById(towerName, fcId);
            const alarm = _createTempAlarm(towerName, fc, typeAlarm);
            let collection = yield (0, db_service_1.getCollection)(dbName, 'alarm');
            yield collection.insertOne(alarm);
            socketService.emitRender('alarm');
            socketService.emitRender(`fcs-${towerName}-${fc.floor}`);
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
            let collection = yield (0, db_service_1.getCollection)(dbName, 'alarm');
            yield collection.updateOne({ id: alarmId, acknolage: false }, { $set: { activation: false, alarmStatus: 2, endTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }) } });
            yield collection.deleteOne({ id: alarmId, acknolage: true });
            socketService.emitRender('alarm');
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
            let collection = yield (0, db_service_1.getCollection)(dbName, 'alarm');
            yield collection.updateMany({ acknolage: false }, { $set: { activation: false, alarmStatus: 2, endTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }) } });
            yield collection.deleteMany({ acknolage: true });
            socketService.emitRender('alarm');
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
            let collection = yield (0, db_service_1.getCollection)(dbName, 'alarm');
            yield collection.updateOne({ id: alarmId, activation: true }, { $set: { acknolage: true, alarmStatus: 3, ackTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }) } });
            yield collection.deleteOne({ id: alarmId, activation: false });
            socketService.emitRender('alarm');
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
            let collection = yield (0, db_service_1.getCollection)(dbName, 'alarm');
            yield collection.updateMany({ activation: true }, { $set: { acknolage: true, alarmStatus: 3, ackTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }) } });
            yield collection.deleteMany({ activation: false });
            socketService.emitRender('alarm');
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
            socketService.emitRender('alarm');
        }), 30 * 60 * 1000);
    });
}
exports.startAckInterval = startAckInterval;
function _createTempAlarm(towerName, fc, typeAlarm) {
    const alarmDescription = typeAlarm === 'high' ? 'High temperature' : 'Low temperature';
    const alarm = {
        id: _makeId(12),
        fc: {
            towerName,
            id: fc.id
        },
        alarmStatus: 1,
        startTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }),
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
