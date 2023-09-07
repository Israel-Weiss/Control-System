import { fcService, alarmService} from '../api'
import { socketService } from './'

import { Fc } from '../types/interfaces'
import { TypeAlarm } from '../types/enums'

const towerNames = ['A', 'B', 'C', 'D']
const emitFcs = 'fcsList'

interface TimeoutId { id: string, timeout?: NodeJS.Timeout }
type TimeoutIds = TimeoutId[]
let timeoutIds: TimeoutIds
let intervalId: NodeJS.Timeout

async function startTempInterval(): Promise<void> {
    await _resetAppTemp()
    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(async (): Promise<void> => {
        for (var i = 0; i < towerNames.length; i++) {
            await _setTowerTemp(towerNames[i])
        }
        socketService.emitRender(emitFcs)
    }, 300 * 1000)
}

async function _setTowerTemp(towerName: string) {
    const fcsList: Fc[] = await fcService.query(towerName)
    const upTempFcs: Fc[] = fcsList.map((fc: Fc): Fc => {
        fc.temp = _createTemp(fc.temp, fc.spTemp)
        fc.version = 1
        delete fc._id
        return fc
    })
    const upAlarmFcs: Fc[] = _getTowerListUpAlarms(upTempFcs, towerName)
    await fcService.updateAll(towerName, upAlarmFcs)
}

function _createTemp(val: number, sp: number): number {
    let num: number = _getRandomIntInclusive_(1, 60)
    const deviation: number = Math.abs(val - sp)
    if (deviation < 2) return _getNextTemp(num, val)
    if ((deviation > 5) && (num < 54)) return val
    return sp
}

function _getNextTemp(num: number, val: number): number {
    let newVal: number
    if (num < 24) newVal = val + 1
    else if (num < 42) newVal = val - 1
    else if (num < 60) newVal = val
    else newVal = _getRandomIntInclusive_(0, 50)
    return newVal
}

function _getTowerListUpAlarms(fcsList: Fc[], towerName: string): Fc[] {
    const nweList: Fc[] = fcsList.map((curFc: Fc): Fc => {
        const intervalAlarm: boolean = curFc.intervalToAlarm <= Math.abs(curFc.temp - curFc.spTemp) ? true : false
        if ((!intervalAlarm && curFc.alarm === 0) || (intervalAlarm && curFc.alarm > 0)) {
            return curFc
        }
        if (intervalAlarm) {
            const typeAlarm: TypeAlarm = curFc.temp > curFc.spTemp ? TypeAlarm.High : TypeAlarm.Low
            _startTimeout(towerName, curFc, typeAlarm)
            curFc.alarm = 2
        }
        else if (curFc.alarm === 2) {
            _stopTimeout(curFc.id)
            curFc.alarm = 0
        }
        else {
            _endAlarm(curFc)
            curFc.alarm = 0
            curFc.tempAlarm = { status: 0, highTempId: null, lowTempId: null }
        }
        return curFc
    })
    return nweList
}

async function _resetAppTemp(): Promise<void> {
    await _createTimeoutIds()
    alarmService.endAll()
    for (var i = 0; i < towerNames.length; i++) {
        await fcService.closeAllAlarms(towerNames[i])
        await _setTowerTemp(towerNames[i])
    }
}

function _startTimeout(towerName: string, fc: Fc, typeAlarm: TypeAlarm): void {
    const timeoutIdx: number = timeoutIds.findIndex((timeoutId: TimeoutId): boolean => timeoutId.id === fc.id)

    timeoutIds[timeoutIdx].timeout = setTimeout(() => {
        _openAlarm(towerName, fc.id, typeAlarm)
    }, fc.timeToAlarm * 1000)
}

function _stopTimeout(fcId: string): void {
    const timeoutIdx: number = timeoutIds.findIndex((timeoutId: TimeoutId): boolean => timeoutId.id === fcId)
    clearTimeout(timeoutIds[timeoutIdx].timeout)
}

async function _openAlarm(towerName: string, fcId: string, typeAlarm: TypeAlarm): Promise<void> {
    const alarmId: string = await alarmService.addAlarm(towerName, fcId, typeAlarm)
    const tempAlarm: { status: number, highTempId: string | null, lowTempId: string | null } =
        typeAlarm === TypeAlarm.High
            ? { status: 1, highTempId: alarmId, lowTempId: null }
            : { status: 2, highTempId: null, lowTempId: alarmId }
    fcService.update(towerName, fcId, 'startAlarm', tempAlarm)
}

async function _closeAlarm(towerName: string, fc: Fc): Promise<void> {
    _endAlarm(fc)
    fcService.update(towerName, fc.id, 'endAlarm')
}

async function _endAlarm(fc: Fc): Promise<void> {
    if (fc.tempAlarm.highTempId) await alarmService.endAlarm(fc.tempAlarm.highTempId)
    if (fc.tempAlarm.lowTempId) await alarmService.endAlarm(fc.tempAlarm.lowTempId)
}

async function updateSpecial(tower: string, fcId: string, field: string, val: number): Promise<Fc> {
    switch (field) {
        case 'temp-sp':
            await fcService.update(tower, fcId, 'temp-sp', val)
            break
        case 'interval-alarm':
            await fcService.update(tower, fcId, 'interval-alarm', val)
            break
    }
    await _updateAlarm(tower, fcId)
    const newFc: Fc = await fcService.getById(tower, fcId)
    return newFc
}

async function _updateAlarm(towerName: string, fcId: string): Promise<void> {
    let fc: Fc = await fcService.getById(towerName, fcId)
    const deviationAlarm: Boolean = fc.intervalToAlarm <= Math.abs(fc.temp - fc.spTemp) ? true : false
    if ((!deviationAlarm && fc.alarm === 0)
        || (deviationAlarm && fc.alarm > 0)) return

    if (deviationAlarm) {
        const typeAlarm: TypeAlarm = fc.temp > fc.spTemp ? TypeAlarm.High : TypeAlarm.Low
        _startTimeout(towerName, fc, typeAlarm)
        await fcService.update(towerName, fc.id, 'alarm', 2)
    }
    else if (fc.alarm === 2) {
        _stopTimeout(fc.id)
        await fcService.update(towerName, fc.id, 'alarm', 0)
    }
    else _closeAlarm(towerName, fc)
}

async function _createTimeoutIds(): Promise<TimeoutIds> {
    timeoutIds = []
    for (var i = 0; i < towerNames.length; i++) {
        const fcs: Fc[] = await fcService.query(towerNames[i])
        fcs.forEach((fc: Fc) => timeoutIds.push({ id: fc.id, timeout: undefined }))
    }
    return timeoutIds
}

function _getRandomIntInclusive_(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export {
    startTempInterval,
    updateSpecial
}









