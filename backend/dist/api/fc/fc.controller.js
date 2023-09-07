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
exports.updateFc = exports.getFc = exports.getFcs = void 0;
const fc_service_1 = require("./fc.service");
const services_1 = require("../../services");
function getFcs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tower, floor } = req.query;
            const fcs = yield (0, fc_service_1.query)(tower, floor);
            res.send(fcs);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to find fan coil units' });
        }
    });
}
exports.getFcs = getFcs;
function getFc(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fcId = req.params.id;
            const { tower } = req.query;
            const fc = yield (0, fc_service_1.getById)(tower, fcId);
            res.send(fc);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to find fan coil unit' });
        }
    });
}
exports.getFc = getFc;
function updateFc(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fcId = req.params.id;
            const { tower } = req.query;
            const { field, val } = req.body;
            const newFc = field === 'interval-alarm' || field === 'temp-sp'
                ? yield services_1.tempService.updateSpecial(tower, fcId, field, val)
                : yield (0, fc_service_1.update)(tower, fcId, field, val);
            res.send(newFc);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to update fan coil unit' });
        }
    });
}
exports.updateFc = updateFc;
// import { createJsonFiles } from './fc.create'
// createJsonFiles()
