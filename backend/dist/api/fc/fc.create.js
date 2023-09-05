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
exports.createJsonFiles = void 0;
const fcService = __importStar(require("./fc.service"));
const desImport = __importStar(require("../../data/descriptios"));
const towerNames = ['A', 'B', 'C', 'D'];
const { fcsDesA, fcsDesB, fcsDesC, fcsDesD } = desImport;
const allFcsDes = [fcsDesA, fcsDesB, fcsDesC, fcsDesD];
function createJsonFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        for (var i = 0; i < allFcsDes.length; i++) {
            let towerName = towerNames[i];
            let towerDesObj = allFcsDes[i];
            let fcs = [];
            for (const floor in towerDesObj) {
                const curFlDes = towerDesObj[floor];
                let flFcs = _createFloor(curFlDes, towerName, floor);
                fcs.push(...flFcs);
            }
            yield fcService.createCollection(towerName, fcs);
            console.log(towerName);
        }
    });
}
exports.createJsonFiles = createJsonFiles;
function _createFloor(flDes, towerName, floor) {
    let fcs = [];
    let num = (+floor.replace('fl', '')) * 100;
    for (var i = 0; i < flDes.length; i++) {
        let stNum = '' + num;
        let newNum = stNum.padStart(4, '0');
        const com = getRandomIntInclusive(0, 2);
        let temp = getRandomIntInclusive(16, 25);
        let fc = {
            id: _makeId(),
            floor,
            num: towerName + newNum,
            description: flDes[i],
            comand: com,
            status: createStatus(com),
            temp,
            spTemp: temp + 1,
            mode: getRandomIntInclusive(0, 3),
            fan: getRandomIntInclusive(0, 3),
            intervalToAlarm: getRandomIntInclusive(3, 4),
            timeToAlarm: 10,
            alarm: 0,
            tempAlarm: {
                status: 0,
                highTempId: null,
                lowTempId: null
            },
            version: 0
        };
        fcs.push(fc);
        num++;
    }
    return fcs;
}
function createStatus(com) {
    if (com === 0)
        return 0;
    if (com === 1)
        return 1;
    return getRandomIntInclusive(0, 1);
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
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
