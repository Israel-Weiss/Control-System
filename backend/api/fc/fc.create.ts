import * as fcService from './fc.service'
import * as desImport from '../../data/descriptios'
import { Fc, Fcs } from '../../services/types'

const towerNames = ['A', 'B', 'C', 'D']

type flDes = string[]
type towerDes = { [index: string]: flDes }

const { fcsDesA, fcsDesB, fcsDesC, fcsDesD }: { fcsDesA: towerDes, fcsDesB: towerDes, fcsDesC: towerDes, fcsDesD: towerDes } = desImport
const allFcsDes: towerDes[] = [fcsDesA, fcsDesB, fcsDesC, fcsDesD]

export async function createJsonFiles(): Promise<void> {
    for (var i = 0; i < allFcsDes.length; i++) {
        let towerName: string = towerNames[i]
        let towerDesObj: towerDes = allFcsDes[i]
        let fcs: Fcs = []
        for (const floor in towerDesObj) {
            const curFlDes: flDes = towerDesObj[floor]
            let flFcs: Fcs = _createFloor(curFlDes, towerName, floor)
            fcs.push(...flFcs)
        }
        await fcService.createCollection(towerName, fcs)
        console.log(towerName)
    }
}

function _createFloor(flDes: flDes, towerName: string, floor: string): Fcs {
    let fcs: Fcs = []
    let num = (+floor.replace('fl', '')) * 100
    for (var i = 0; i < flDes.length; i++) {
        let stNum: string = '' + num
        let newNum: string = stNum.padStart(4, '0')
        const com: number = getRandomIntInclusive(0, 2)
        let temp: number = getRandomIntInclusive(16, 25)
        let fc: Fc = {
            id: _makeId(),
            floor,
            num: towerName + newNum,
            description: flDes[i],
            comand: com,
            status: createStatus(com),
            temp,
            spTemp: temp + 1,
            mode: getRandomIntInclusive(0, 3),
            fan: getRandomIntInclusive(0, 3),
            intervalToAlarm: getRandomIntInclusive(3, 4),
            timeToAlarm: 10,
            alarm: 0,
            tempAlarm: {
                status: 0,
                highTempId: null,
                lowTempId: null
            },
            version: 0
        }
        fcs.push(fc)
        num++
    }
    return fcs
}

function createStatus(com: number): number {
    if (com === 0) return 0
    if (com === 1) return 1
    return getRandomIntInclusive(0, 1)
}

function _makeId(length: number = 6): string {
    let idText = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        var char = chars.charAt(Math.floor(Math.random() * (chars.length)))
        idText += char
    }
    return idText
}

function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

