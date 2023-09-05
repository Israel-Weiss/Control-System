import { getCollection } from '../../services/db.service'
import * as socketService from '../../services/socket.service'
import * as mongoDB from "mongodb"
import {User,Users } from '../../services/types'

const dbName = 'tsDB'

async function query(): Promise<Users> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'user')
        let users = await collection.find({}).toArray() as Users
        return users
    } catch (err) {
        throw err
    }
}

async function getById(userId: string): Promise<User> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'user')
        const user = await collection.findOne({ id: userId }) as User
        return user
    } catch (err) {
        throw err
    }
}

async function getByParams(userName: string, password: string): Promise<User> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'user')
        const user = await collection.findOne({ name: { $regex: userName, $options: 'i' }, password: password }) as User
        return user
    } catch (err) {
        throw err
    }
}

async function update(userId: string, password: string, authorization: number): Promise<User> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'user')
        await collection.updateOne({ id: userId }, { $set: { password: password, authorization: authorization } })
        const newUser: User = await getById(userId)
        socketService.emitRender(`user`)
        return newUser
    } catch (err) {
        throw err
    }
}

async function add(name: string, password: string, authorization: number): Promise<User> {
    try {
        const newUser: User = { id: _makeId(), name, authorization, password, default: false }
        let collection: mongoDB.Collection = await getCollection(dbName, 'user')
        await collection.insertOne(newUser)
        socketService.emitRender(`user`)
        return await getById(newUser.id)
    } catch (err) {
        throw err
    }
}

async function remove(userId: string): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'user')
        collection.deleteOne({ id: userId })
        socketService.emitRender(`user`)
        return
    } catch (err) {
        throw err
    }
}

function _makeId(length: number = 6): string {
    let idText = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        var char: string = chars.charAt(Math.floor(Math.random() * (chars.length)))
        idText += char
    }
    return idText
}
export {
    query,
    getById,
    getByParams,
    update,
    add,
    remove
}


// createDefaultUsers()
// async function createDefaultUsers(): Promise<Users> {
//     let collection: mongoDB.Collection = await getCollection(dbName, 'user')
//     const usersList: Users = [
//         { id: _makeId(), name: 'View', authorization: 0, password: '1111', default: true },
//         { id: _makeId(), name: 'Operator', authorization: 1, password: '2222', default: true },
//         { id: _makeId(), name: 'Admin', authorization: 2, password: '3333', default: true }
//     ]
//     await collection.deleteMany({})
//     await collection.insertMany(usersList)
//     return await query()
// }






