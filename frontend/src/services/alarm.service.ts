import { httpService } from "./http.service"
import { Alarm } from '../types/interfaces'

export {
    getAlarms,
    update,
    updateAll
}

async function getAlarms(): Promise<Alarm[]> {
    const alarmsList: Alarm[] = await httpService.get(`alarm`)
    return alarmsList
}

async function update(alarmId: string, field: string): Promise<Alarm> {
    const body: { field: string } = { field }
    const upAlarm: Alarm = await httpService.put(`Alarm/${alarmId}`, body)
    return upAlarm
}


async function updateAll(): Promise<Alarm[]> {
    const NewList: Alarm[] = await httpService.put(`Alarm`)
    return NewList
}

