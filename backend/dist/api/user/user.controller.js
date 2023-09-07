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
exports.removeUser = exports.addUser = exports.updateUser = exports.getUserByParams = exports.getUserById = exports.getUsers = void 0;
const user_service_1 = require("./user.service");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, user_service_1.query)();
            res.send(users);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to find users list' });
        }
    });
}
exports.getUsers = getUsers;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const user = yield (0, user_service_1.getById)(userId);
            res.send(user);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to find user' });
        }
    });
}
exports.getUserById = getUserById;
function getUserByParams(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userName, password } = req.query;
            const user = yield (0, user_service_1.getByParams)(userName, password);
            res.send(user);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to find user' });
        }
    });
}
exports.getUserByParams = getUserByParams;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const { password, authorization } = req.body;
            const newUser = yield (0, user_service_1.update)(userId, password, authorization);
            res.send(newUser);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to update user' });
        }
    });
}
exports.updateUser = updateUser;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, password, authorization } = req.body;
            const newUser = yield (0, user_service_1.add)(name, password, authorization);
            res.send(newUser);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to add user' });
        }
    });
}
exports.addUser = addUser;
function removeUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            console.log('removeUser', userId);
            yield (0, user_service_1.remove)(userId);
            res.send('Succesffully');
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to delete user' });
        }
    });
}
exports.removeUser = removeUser;
