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
exports.remove = exports.add = exports.update = exports.getByParams = exports.getById = exports.query = void 0;
const services_1 = require("../../services");
const enums_1 = require("../../types/enums");
const dbName = 'tsDB';
const emitUser = 'user';
function query() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_1.getCollection)(dbName, enums_1.CollectionName.User);
            let users = yield collection.find({}).toArray();
            return users;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.query = query;
function getById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_1.getCollection)(dbName, enums_1.CollectionName.User);
            const user = yield collection.findOne({ id: userId });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getById = getById;
function getByParams(userName, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_1.getCollection)(dbName, enums_1.CollectionName.User);
            const user = yield collection.findOne({ name: { $regex: userName, $options: 'i' }, password: password });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getByParams = getByParams;
function update(userId, password, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_1.getCollection)(dbName, enums_1.CollectionName.User);
            yield collection.updateOne({ id: userId }, { $set: { password: password, authorization: authorization } });
            const newUser = yield getById(userId);
            services_1.socketService.emitRender(emitUser);
            return newUser;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.update = update;
function add(name, password, authorization) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = { id: _makeId(), name, authorization, password, default: false };
            let collection = yield (0, services_1.getCollection)(dbName, enums_1.CollectionName.User);
            yield collection.insertOne(newUser);
            services_1.socketService.emitRender(emitUser);
            return yield getById(newUser.id);
        }
        catch (err) {
            throw err;
        }
    });
}
exports.add = add;
function remove(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let collection = yield (0, services_1.getCollection)(dbName, enums_1.CollectionName.User);
            collection.deleteOne({ id: userId });
            services_1.socketService.emitRender(emitUser);
            return;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.remove = remove;
function _makeId(length = 6) {
    let idText = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        var char = chars.charAt(Math.floor(Math.random() * (chars.length)));
        idText += char;
    }
    return idText;
}
// createDefaultUsers()
// async function createDefaultUsers(): Promise<User[]> {
//     let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.User)
//     const usersList: User[] = [
//         { id: _makeId(), name: 'View', authorization: 0, password: '1111', default: true },
//         { id: _makeId(), name: 'Operator', authorization: 1, password: '2222', default: true },
//         { id: _makeId(), name: 'Admin', authorization: 2, password: '3333', default: true }
//     ]
//     await collection.deleteMany({})
//     await collection.insertMany(usersList)
//     return await query()
// }
