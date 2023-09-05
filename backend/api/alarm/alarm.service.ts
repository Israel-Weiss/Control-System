import * as mongoDB from "mongodb"
import * as socketService from '../../services/socket.service'
import { getCollection } from '../../services/db.service'
import * as fcService from'../fc/fc.service'
import { Alarm, Alarms, Fc } from '../../services/types'

const dbName = 'tsDB'

export {
    query,
    addAlarm,
    endAlarm,
    endAll,
    ackAlarm,
    ackAll,
    startAckInterval
}

async function query(): Promise<Alarms> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'alarm')
        let alarms = await collection.find({}).sort({ startTime: -1 }).limit(4000).toArray() as Alarms
        return alarms
    } catch (err) {
        throw err
    }
}

async function addAlarm(towerName: string, fcId: string, typeAlarm: string): Promise<string> {
    try {
        const fc: Fc = await fcService.getById(towerName, fcId)
        const alarm: Alarm = _createTempAlarm(towerName, fc, typeAlarm)
        let collection: mongoDB.Collection = await getCollection(dbName, 'alarm')
        await collection.insertOne(alarm)

        socketService.emitRender('alarm')
        socketService.emitRender(`fcs-${towerName}-${fc.floor}`)
        return alarm.id
    } catch (err) {
        throw err
    }
}

async function endAlarm(alarmId: string): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'alarm')
        await collection.updateOne({ id: alarmId, acknolage: false },
            { $set: { activation: false, alarmStatus: 2, endTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }) } })
        await collection.deleteOne({ id: alarmId, acknolage: true })
        socketService.emitRender('alarm')
        return
    } catch (err) {
        throw err
    }
}

async function endAll(): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'alarm')
        await collection.updateMany({ acknolage: false }, { $set: { activation: false, alarmStatus: 2, endTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }) } })
        await collection.deleteMany({ acknolage: true })
        socketService.emitRender('alarm')
        return
    } catch (err) {
        throw err
    }
}

async function ackAlarm(alarmId: string): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'alarm')
        await collection.updateOne({ id: alarmId, activation: true }, { $set: { acknolage: true, alarmStatus: 3, ackTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }) } })
        await collection.deleteOne({ id: alarmId, activation: false })
        socketService.emitRender('alarm')
        return
    } catch (err) {
        throw err
    }
}

async function ackAll(): Promise<void> {
    try {
        let collection: mongoDB.Collection = await getCollection(dbName, 'alarm')
        await collection.updateMany({ activation: true }, { $set: { acknolage: true, alarmStatus: 3, ackTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }) } })
        await collection.deleteMany({ activation: false })
        socketService.emitRender('alarm')
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
        socketService.emitRender('alarm')
    }, 30 * 60 * 1000)
}

function _createTempAlarm(towerName: string, fc: Fc, typeAlarm: string): Alarm {
    const alarmDescription: string = typeAlarm === 'high' ? 'High temperature' : 'Low temperature'
    const alarm: Alarm = {
        id: _makeId(12),
        fc: {
            towerName,
            id: fc.id
        },
        alarmStatus: 1,
        startTime: new Date().toLocaleString('en-GB', { timeZone: 'Asia/Jerusalem' }),
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

