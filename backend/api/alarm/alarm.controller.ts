import { Request, Response } from 'express'
import * as alarmService from './alarm.service'
import { Alarms } from '../../services/types'



async function getAlarms(req: Request, res: Response): Promise<void> {
    try {
        const alarms: Alarms = await alarmService.query()
        res.send(alarms)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find alarms' })
    }
}

async function updateAlarm(req: Request, res: Response): Promise<void> {
    try {
        const alarmId: string = req.params.id
        const { field }: { field: string} = req.body

        field === 'ack'
            ? await alarmService.ackAlarm(alarmId)
            : await alarmService.endAlarm(alarmId)

        res.send('Update alarm successfully')
    } catch (err) {
        res.status(500).send({ err: 'Failed to update alarm' })
    }
}

async function updateAll(req: Request, res: Response): Promise<void> {
    try {
        await alarmService.ackAll()
        res.send('Ack all alarms successfully')
    } catch (err) {
        res.status(500).send({ err: 'Failed to acknolage alarms' })
    }
}

export {
    getAlarms,
    updateAlarm,
    updateAll
}