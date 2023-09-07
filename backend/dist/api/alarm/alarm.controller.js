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
exports.updateAll = exports.updateAlarm = exports.getAlarms = void 0;
const alarm_service_1 = require("./alarm.service");
function getAlarms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const alarms = yield (0, alarm_service_1.query)();
            res.send(alarms);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to find alarms' });
        }
    });
}
exports.getAlarms = getAlarms;
function updateAlarm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const alarmId = req.params.id;
            const { field } = req.body;
            field === 'ack'
                ? yield (0, alarm_service_1.ackAlarm)(alarmId)
                : yield (0, alarm_service_1.endAlarm)(alarmId);
            res.send('Update alarm successfully');
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to update alarm' });
        }
    });
}
exports.updateAlarm = updateAlarm;
function updateAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, alarm_service_1.ackAll)();
            res.send('Ack all alarms successfully');
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to acknolage alarms' });
        }
    });
}
exports.updateAll = updateAll;
