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
exports.updateSpecial = exports.startTempInterval = void 0;
const fcService = __importStar(require("../api/fc/fc.service"));
const alarmService = __importStar(require("../api/alarm/alarm.service"));
const socketService = __importStar(require("./socket.service"));
const towerNames = ['A', 'B', 'C', 'D'];
let timeoutIds;
let intervalId;
function startTempInterval() {
    return __awaiter(this, void 0, void 0, function* () {
        yield _resetAppTemp();
        if (intervalId)
            clearInterval(intervalId);
        intervalId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            for (var i = 0; i < towerNames.length; i++) {
                yield _setTowerTemp(towerNames[i]);
            }
            socketService.emitRender('fcsList');
        }), 300 * 1000);
    });
}
exports.startTempInterval = startTempInterval;
function _setTowerTemp(towerName) {
    return __awaiter(this, void 0, void 0, function* () {
        const fcsList = yield fcService.query(towerName);
        const upTempFcs = fcsList.map((fc) => {
            fc.temp = _createTemp(fc.temp, fc.spTemp);
            fc.version = 1;
            delete fc._id;
            return fc;
        });
        const upAlarmFcs = _getTowerListUpAlarms(upTempFcs, towerName);
        yield fcService.updateAll(towerName, upAlarmFcs);
    });
}
function _createTemp(val, sp) {
    let num = _getRandomIntInclusive_(1, 60);
    const deviation = Math.abs(val - sp);
    if (deviation < 2)
        return _getNextTemp(num, val);
    if ((deviation > 5) && (num < 54))
        return val;
    return sp;
}
function _getNextTemp(num, val) {
    let newVal;
    if (num < 24)
        newVal = val + 1;
    else if (num < 42)
        newVal = val - 1;
    else if (num < 60)
        newVal = val;
    else
        newVal = _getRandomIntInclusive_(0, 50);
    return newVal;
}
function _getTowerListUpAlarms(fcsList, towerName) {
    const nweList = fcsList.map((curFc) => {
        const intervalAlarm = curFc.intervalToAlarm <= Math.abs(curFc.temp - curFc.spTemp) ? true : false;
        if ((!intervalAlarm && curFc.alarm === 0) || (intervalAlarm && curFc.alarm > 0)) {
            return curFc;
        }
        if (intervalAlarm) {
            const typeAlarm = curFc.temp > curFc.spTemp ? 'high' : 'low';
            _startTimeout(towerName, curFc, typeAlarm);
            curFc.alarm = 2;
        }
        else if (curFc.alarm === 2) {
            _stopTimeout(curFc.id);
            curFc.alarm = 0;
        }
        else {
            _endAlarm(curFc);
            curFc.alarm = 0;
            curFc.tempAlarm = { status: 0, highTempId: null, lowTempId: null };
        }
        return curFc;
    });
    return nweList;
}
function _resetAppTemp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield _createTimeoutIds();
        alarmService.endAll();
        for (var i = 0; i < towerNames.length; i++) {
            yield fcService.closeAllAlarms(towerNames[i]);
            yield _setTowerTemp(towerNames[i]);
        }
    });
}
function _startTimeout(towerName, fc, typeAlarm) {
    const timeoutIdx = timeoutIds.findIndex((timeoutId) => timeoutId.id === fc.id);
    timeoutIds[timeoutIdx].timeout = setTimeout(() => {
        _openAlarm(towerName, fc.id, typeAlarm);
    }, fc.timeToAlarm * 1000);
}
function _stopTimeout(fcId) {
    const timeoutIdx = timeoutIds.findIndex((timeoutId) => timeoutId.id === fcId);
    clearTimeout(timeoutIds[timeoutIdx].timeout);
}
function _openAlarm(towerName, fcId, typeAlarm) {
    return __awaiter(this, void 0, void 0, function* () {
        const alarmId = yield alarmService.addAlarm(towerName, fcId, typeAlarm);
        const tempAlarm = typeAlarm === 'high'
            ? { status: 1, highTempId: alarmId, lowTempId: null }
            : { status: 2, highTempId: null, lowTempId: alarmId };
        fcService.update(towerName, fcId, 'startAlarm', tempAlarm);
    });
}
function _closeAlarm(towerName, fc) {
    return __awaiter(this, void 0, void 0, function* () {
        _endAlarm(fc);
        fcService.update(towerName, fc.id, 'endAlarm');
    });
}
function _endAlarm(fc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fc.tempAlarm.highTempId)
            yield alarmService.endAlarm(fc.tempAlarm.highTempId);
        if (fc.tempAlarm.lowTempId)
            yield alarmService.endAlarm(fc.tempAlarm.lowTempId);
    });
}
function updateSpecial(tower, fcId, field, val) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (field) {
            case 'temp-sp':
                yield fcService.update(tower, fcId, 'temp-sp', val);
                break;
            case 'interval-alarm':
                yield fcService.update(tower, fcId, 'interval-alarm', val);
                break;
        }
        yield _updateAlarm(tower, fcId);
        const newFc = yield fcService.getById(tower, fcId);
        return newFc;
    });
}
exports.updateSpecial = updateSpecial;
function _updateAlarm(towerName, fcId) {
    return __awaiter(this, void 0, void 0, function* () {
        let fc = yield fcService.getById(towerName, fcId);
        const deviationAlarm = fc.intervalToAlarm <= Math.abs(fc.temp - fc.spTemp) ? true : false;
        if ((!deviationAlarm && fc.alarm === 0)
            || (deviationAlarm && fc.alarm > 0))
            return;
        if (deviationAlarm) {
            const typeAlarm = fc.temp > fc.spTemp ? 'high' : 'low';
            _startTimeout(towerName, fc, typeAlarm);
            yield fcService.update(towerName, fc.id, 'alarm', 2);
        }
        else if (fc.alarm === 2) {
            _stopTimeout(fc.id);
            yield fcService.update(towerName, fc.id, 'alarm', 0);
        }
        else
            _closeAlarm(towerName, fc);
    });
}
function _createTimeoutIds() {
    return __awaiter(this, void 0, void 0, function* () {
        timeoutIds = [];
        for (var i = 0; i < towerNames.length; i++) {
            const fcs = yield fcService.query(towerNames[i]);
            fcs.forEach((fc) => timeoutIds.push({ id: fc.id, timeout: undefined }));
        }
        return timeoutIds;
    });
}
function _getRandomIntInclusive_(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
