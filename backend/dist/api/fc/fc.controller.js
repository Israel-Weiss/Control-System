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
exports.updateFc = exports.getFc = exports.getFcs = void 0;
const fcService = __importStar(require("./fc.service"));
const tempService = __importStar(require("../../services/temp.service"));
function getFcs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tower, floor } = req.query;
            const fcs = yield fcService.query(tower, floor);
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
            const fc = yield fcService.getById(tower, fcId);
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
                ? yield tempService.updateSpecial(tower, fcId, field, val)
                : yield fcService.update(tower, fcId, field, val);
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
