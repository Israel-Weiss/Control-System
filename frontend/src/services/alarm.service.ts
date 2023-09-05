import { httpService } from "./http.service"
import { Alarm, Alarms } from './types'

export {
    getAlarms,
    update,
    updateAll
}

async function getAlarms(): Promise<Alarms> {
    const alarmsList: Alarms = await httpService.get(`alarm`)
    return alarmsList
}

async function update(alarmId: string, field: string): Promise<Alarm> {
    const body: { field: string } = { field }
    const upAlarm: Alarm = await httpService.put(`Alarm/${alarmId}`, body)
    return upAlarm
}


async function updateAll(): Promise<Alarms> {
    const NewList: Alarms = await httpService.put(`Alarm`)
    return NewList
}

