"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fcRoutes = void 0;
const express_1 = __importDefault(require("express"));
const fc_controller_1 = require("./fc.controller");
exports.fcRoutes = express_1.default.Router();
exports.fcRoutes.get('/', fc_controller_1.getFcs);
exports.fcRoutes.get('/:id', fc_controller_1.getFc);
exports.fcRoutes.put('/:id', fc_controller_1.updateFc);
