import * as mongoDB from "mongodb"
import 'dotenv/config'

import { CollectionName } from "../types"

export async function getCollection(dbName: string, collectionName: CollectionName): Promise<mongoDB.Collection> {
    try {
        const db: mongoDB.Db = await connect(dbName)
        const collection: mongoDB.Collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        throw err
    }
}

var dbConnection: mongoDB.Db

async function connect(dbName: string): Promise<mongoDB.Db> {
    if (dbConnection) return dbConnection
    try {
        const client: mongoDB.MongoClient = await mongoDB.MongoClient.connect(process.env.MONGO_CHANNEL!)
        dbConnection = client.db(dbName)
        return dbConnection
    } catch (err) {
        throw err
    }
}