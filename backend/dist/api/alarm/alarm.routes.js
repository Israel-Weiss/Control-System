"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alarmRoutes = void 0;
const express_1 = __importDefault(require("express"));
const alarm_controller_1 = require("./alarm.controller");
exports.alarmRoutes = express_1.default.Router();
exports.alarmRoutes.get('/', alarm_controller_1.getAlarms);
exports.alarmRoutes.put('/', alarm_controller_1.updateAll);
exports.alarmRoutes.put('/:id', alarm_controller_1.updateAlarm);
