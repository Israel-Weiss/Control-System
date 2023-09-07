import * as mongoDB from "mongodb"

import { socketService } from '../../services'
import { getCollection } from '../../services'
import { fcService } from '../'
import { Alarm, Fc, CollectionName, TypeAlarm, AlarmDes } from '../../types'

const dbName = 'tsDB'
const emitAlarm = 'alarm'
const jerusalemZone = 'Asia/Jerusalem'

export {
    query,
    addAlarm,
    endAlarm,
    endAll,
    ackAlarm,
    ackAll,
    startAckInterval
}

async function query(): Promise<Alarm[]> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.Alarm)
        let alarms = await collection.find({}).sort({ startTime: -1 }).limit(4000).toArray() as Alarm[]
        return alarms
    } catch (err) {
        throw err
    }
}

async function addAlarm(towerName: string, fcId: string, typeAlarm: TypeAlarm): Promise<string> {    
    try {
        const fc: Fc = await fcService.getById(towerName, fcId)
        const alarm: Alarm = _createTempAlarm(towerName, fc, typeAlarm)
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.Alarm)
        await collection.insertOne(alarm)

        socketService.emitRender(emitAlarm)
        socketService.emitRender(_getEmitFc(towerName, fc.floor))
        return alarm.id
    } catch (err) {
        throw err
    }
}

async function endAlarm(alarmId: string): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.Alarm)
        await collection.updateOne({ id: alarmId, acknolage: false },
            { $set: { activation: false, alarmStatus: 2, endTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }) } })
        await collection.deleteOne({ id: alarmId, acknolage: true })
        socketService.emitRender(emitAlarm)
        return
    } catch (err) {
        throw err
    }
}

async function endAll(): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.Alarm)
        await collection.updateMany({ acknolage: false }, { $set: { activation: false, alarmStatus: 2, endTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }) } })
        await collection.deleteMany({ acknolage: true })
        socketService.emitRender(emitAlarm)
        return
    } catch (err) {
        throw err
    }
}

async function ackAlarm(alarmId: string): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.Alarm)
        await collection.updateOne({ id: alarmId, activation: true }, { $set: { acknolage: true, alarmStatus: 3, ackTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }) } })
        await collection.deleteOne({ id: alarmId, activation: false })
        socketService.emitRender(emitAlarm)
        return
    } catch (err) {
        throw err
    }
}

async function ackAll(): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, CollectionName.Alarm)
        await collection.updateMany({ activation: true }, { $set: { acknolage: true, alarmStatus: 3, ackTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }) } })
        await collection.deleteMany({ activation: false })
        socketService.emitRender(emitAlarm)
        return
    } catch (err) {
        throw err
    }
}

let intervalId: NodeJS.Timeout
async function startAckInterval(): Promise<void> {
    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(async () => {
        await ackAll()
        socketService.emitRender(emitAlarm)
    }, 30 * 60 * 1000)
}

function _createTempAlarm(towerName: string, fc: Fc, typeAlarm: TypeAlarm): Alarm {
    const alarmDescription: AlarmDes = typeAlarm === TypeAlarm.High 
    ? AlarmDes.High 
    : AlarmDes.Low
    const alarm: Alarm = {
        id: _makeId(12),
        fc: {
            towerName,
            id: fc.id
        },
        alarmStatus: 1,
        startTime: new Date().toLocaleString('en-GB', { timeZone: jerusalemZone }),
        activation: true,
        endTime: null,
        acknolage: false,
        ackTime: null,
        display: true,
        zone: towerName,
        family: 'AC',
        txt: `Tower ${towerName} floor ${+fc.floor.substring(2, 4)} - ${fc.description} - ${alarmDescription}`
    }
    return alarm
}

function _makeId(length = 6): string {
    let idText = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        var char = chars.charAt(Math.floor(Math.random() * (chars.length)))
        idText += char
    }
    return idText
}

function _getEmitFc(towerName: string, floor: string) {
    return `fcs-${towerName}-${floor}`
}

