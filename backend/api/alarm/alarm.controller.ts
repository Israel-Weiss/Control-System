import { Request, Response } from 'express'

import { query, endAlarm, ackAlarm, ackAll } from './alarm.service'
import { Alarm } from '../../types'



async function getAlarms(req: Request, res: Response): Promise<void> {
    try {
        const alarms: Alarm[] = await query()
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
            ? await ackAlarm(alarmId)
            : await endAlarm(alarmId)

        res.send('Update alarm successfully')
    } catch (err) {
        res.status(500).send({ err: 'Failed to update alarm' })
    }
}

async function updateAll(req: Request, res: Response): Promise<void> {
    try {
        await ackAll()
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