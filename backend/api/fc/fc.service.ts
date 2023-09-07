import * as mongoDB from "mongodb"

import { socketService } from '../../services'
import { getCollection } from '../../services/db.service'
import { Fc } from '../../types/interfaces'
import { CollectionName } from "../../types/enums"

const dbName = 'tsDB'

async function query(tower: string, floor?: string): Promise<Fc[]> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, _getCollectionName(tower))
        let fcsList: Fc[] = floor ? await collection.find({ floor }).toArray() as Fc[] : await collection.find({}).toArray() as Fc[]
        return fcsList
    } catch (err) {
        throw err
    }
}


async function getById(tower: string, fcId: string): Promise<Fc> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, _getCollectionName(tower))
        const fc: Fc = await collection.findOne({ id: fcId }) as Fc
        return fc
    } catch (err) {
        throw err
    }

}


async function updateAll(tower: string, fcs: Fc[]): Promise<Fc[]> {
    try {
        console.log('updateAll 1');
        let collection: mongoDB.Collection = await getCollection(dbName, _getCollectionName(tower))
        await collection.insertMany(fcs)
        await collection.deleteMany({ version: 0 })
        await collection.updateMany({}, { $set: { version: 0 } })
        const newList: Fc[] = await query(tower) 
        console.log('updateAll 2', tower);
        return newList
    } catch (err) {
        throw err
    }
}

async function createCollection(tower: string, fcs: Fc[]): Promise<Fc[]> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, _getCollectionName(tower))
        await collection.deleteMany({})
        await collection.insertMany(fcs)
        const newList: Fc[] = await query(tower)
        return newList
    } catch (err) {
        throw err
    }
}

async function update(tower: string, fcId: string, field: string, val?: number | object): Promise<Fc> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, _getCollectionName(tower))
        switch (field) {
            case 'com':
                if (typeof val !== "number") break;
                const status = _createStatus(val)
                await collection.updateOne({ id: fcId }, { $set: { comand: val, status: status } })
                break;
            case 'mode':
                await collection.updateOne({ id: fcId }, { $set: { mode: val } })
                break;
            case 'fan':
                await collection.updateOne({ id: fcId }, { $set: { fan: val } })
                break;
            case 'time-alarm':
                await collection.updateOne({ id: fcId }, { $set: { timeToAlarm: val } })
                break;
            case 'alarm':
                await collection.updateOne({ id: fcId }, { $set: { alarm: val } })
                break;
            case 'temp-sp':
                await collection.updateOne({ id: fcId }, { $set: { spTemp: val } })
                break;
            case 'interval-alarm':
                await collection.updateOne({ id: fcId }, { $set: { intervalToAlarm: val } })
                break;
            case 'tempAlarm':
                await collection.updateOne({ id: fcId }, { $set: { tempAlarm: val } })
                break;
            case 'startAlarm':
                await collection.updateOne({ id: fcId }, { $set: { alarm: 1, tempAlarm: val } })
                break;
            case 'endAlarm':
                await collection.updateOne({ id: fcId }, { $set: { alarm: 0, tempAlarm: { status: 1, highTempId: null, lowTempId: null } } })
                break;
        }
        const newFc: Fc = await getById(tower, fcId)
        socketService.emitRender(_getEmitFc(tower, newFc.floor))
        return newFc
    } catch (err) {
        throw err
    }
}

async function closeAllAlarms(towerName: string) {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, _getCollectionName(towerName))
        collection.updateMany({}, { $set: { alarm: 0, tempAlarm: { status: 0, highTempId: null, lowTempId: null } } })
    } catch (err) {
        throw err
    }
}

function _createStatus(com: number): number {
    if (com === 0) return 0
    if (com === 1) return 1
    return _getRandomIntInclusive(0, 1)
}

function _getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function _getCollectionName(towerName: string): CollectionName {
    let collectonName: CollectionName
    switch (towerName) {
        case 'A':
            collectonName = CollectionName.Fc_a
            break
        case 'B':
            collectonName = CollectionName.Fc_a
            break
        case 'C':
            collectonName = CollectionName.Fc_a
            break
        case 'D':
            collectonName = CollectionName.Fc_a
            break
        default:
            collectonName = CollectionName.Default
            break
    }
    return collectonName
}

export {
    query,
    getById,
    update,
    updateAll,
    closeAllAlarms,
    createCollection
}

function _getEmitFc(towerName: string, floor: string) {
    return `fcs-${towerName}-${floor}`
}






