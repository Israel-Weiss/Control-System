import * as mongoDB from "mongodb"

import { getCollection, socketService } from '../../services'
import { User } from '../../types/interfaces'
import { CollectionName } from '../../types/enums'

const dbName = 'tsDB'
const emitUser = 'user'

async function query(): Promise<User[]> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.User)
        let users = await collection.find({}).toArray() as User[]
        return users
    } catch (err) {
        throw err
    }
}

async function getById(userId: string): Promise<User> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.User)
        const user = await collection.findOne({ id: userId }) as User
        return user
    } catch (err) {
        throw err
    }
}

async function getByParams(userName: string, password: string): Promise<User> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.User)
        const user = await collection.findOne({ name: { $regex: userName, $options: 'i' }, password: password }) as User
        return user
    } catch (err) {
        throw err
    }
}

async function update(userId: string, password: string, authorization: number): Promise<User> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.User)
        await collection.updateOne({ id: userId }, { $set: { password: password, authorization: authorization } })
        const newUser: User = await getById(userId)
        socketService.emitRender(emitUser)
        return newUser
    } catch (err) {
        throw err
    }
}

async function add(name: string, password: string, authorization: number): Promise<User> {
    try {
        const newUser: User = { id: _makeId(), name, authorization, password, default: false }
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.User)
        await collection.insertOne(newUser)
        socketService.emitRender(emitUser)
        return await getById(newUser.id)
    } catch (err) {
        throw err
    }
}

async function remove(userId: string): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.User)
        collection.deleteOne({ id: userId })
        socketService.emitRender(emitUser)
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






