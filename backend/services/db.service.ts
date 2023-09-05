import * as mongoDB from "mongodb"

export async function getCollection(dbName: string, collectionName: string): Promise<mongoDB.Collection> {
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
        const client: mongoDB.MongoClient = await mongoDB.MongoClient.connect('mongodb+srv://israel:israel123@cluster0.syzvtaz.mongodb.net/?retryWrites=true&w=majority')
        dbConnection = client.db(dbName)
        return dbConnection
    } catch (err) {
        throw err
    }
}