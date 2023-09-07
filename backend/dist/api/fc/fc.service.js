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
exports.createCollection = exports.closeAllAlarms = exports.updateAll = exports.update = exports.getById = exports.query = void 0;
const services_1 = require("../../services");
const db_service_1 = require("../../services/db.service");
const types_1 = require("../../types");
const dbName = 'tsDB';
function query(tower, floor) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, db_service_1.getCollection)(dbName, _getCollectionName(tower));
            let fcsList = floor ? yield collection.find({ floor }).toArray() : yield collection.find({}).toArray();
            return fcsList;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.query = query;
function getById(tower, fcId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, db_service_1.getCollection)(dbName, _getCollectionName(tower));
            const fc = yield collection.findOne({ id: fcId });
            return fc;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getById = getById;
function updateAll(tower, fcs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('updateAll 1');
            let collection = yield (0, db_service_1.getCollection)(dbName, _getCollectionName(tower));
            yield collection.insertMany(fcs);
            yield collection.deleteMany({ version: 0 });
            yield collection.updateMany({}, { $set: { version: 0 } });
            const newList = yield query(tower);
            console.log('updateAll 2', tower);
            return newList;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.updateAll = updateAll;
function createCollection(tower, fcs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, db_service_1.getCollection)(dbName, _getCollectionName(tower));
            yield collection.deleteMany({});
            yield collection.insertMany(fcs);
            const newList = yield query(tower);
            return newList;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.createCollection = createCollection;
function update(tower, fcId, field, val) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, db_service_1.getCollection)(dbName, _getCollectionName(tower));
            switch (field) {
                case 'com':
                    if (typeof val !== "number")
                        break;
                    const status = _createStatus(val);
                    yield collection.updateOne({ id: fcId }, { $set: { comand: val, status: status } });
                    break;
                case 'mode':
                    yield collection.updateOne({ id: fcId }, { $set: { mode: val } });
                    break;
                case 'fan':
                    yield collection.updateOne({ id: fcId }, { $set: { fan: val } });
                    break;
                case 'time-alarm':
                    yield collection.updateOne({ id: fcId }, { $set: { timeToAlarm: val } });
                    break;
                case 'alarm':
                    yield collection.updateOne({ id: fcId }, { $set: { alarm: val } });
                    break;
                case 'temp-sp':
                    yield collection.updateOne({ id: fcId }, { $set: { spTemp: val } });
                    break;
                case 'interval-alarm':
                    yield collection.updateOne({ id: fcId }, { $set: { intervalToAlarm: val } });
                    break;
                case 'tempAlarm':
                    yield collection.updateOne({ id: fcId }, { $set: { tempAlarm: val } });
                    break;
                case 'startAlarm':
                    yield collection.updateOne({ id: fcId }, { $set: { alarm: 1, tempAlarm: val } });
                    break;
                case 'endAlarm':
                    yield collection.updateOne({ id: fcId }, { $set: { alarm: 0, tempAlarm: { status: 1, highTempId: null, lowTempId: null } } });
                    break;
            }
            const newFc = yield getById(tower, fcId);
            services_1.socketService.emitRender(_getEmitFc(tower, newFc.floor));
            return newFc;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.update = update;
function closeAllAlarms(towerName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, db_service_1.getCollection)(dbName, _getCollectionName(towerName));
            collection.updateMany({}, { $set: { alarm: 0, tempAlarm: { status: 0, highTempId: null, lowTempId: null } } });
        }
        catch (err) {
            throw err;
        }
    });
}
exports.closeAllAlarms = closeAllAlarms;
function _createStatus(com) {
    if (com === 0)
        return 0;
    if (com === 1)
        return 1;
    return _getRandomIntInclusive(0, 1);
}
function _getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function _getCollectionName(towerName) {
    let collectonName;
    switch (towerName) {
        case 'A':
            collectonName = types_1.CollectionName.Fc_a;
            break;
        case 'B':
            collectonName = types_1.CollectionName.Fc_a;
            break;
        case 'C':
            collectonName = types_1.CollectionName.Fc_a;
            break;
        case 'D':
            collectonName = types_1.CollectionName.Fc_a;
            break;
        default:
            collectonName = types_1.CollectionName.Default;
            break;
    }
    return collectonName;
}
function _getEmitFc(towerName, floor) {
    return `fcs-${towerName}-${floor}`;
}
