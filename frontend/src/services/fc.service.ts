import { httpService } from "./http.service"
import { Fc } from "../types/interfaces"

export {
    getFcsList,
    update,
    getFlNums
}

interface FcBody {field: string, val: number}

async function getFcsList(towerName: string, floor: string): Promise<Fc[]> {
    const fcsList: Fc[] = await httpService.get(`fc?tower=${towerName}&floor=${floor}`)
    return fcsList
}

async function update(towerName: string, fcId: string, field: string, val: number): Promise<Fc> {
    const body: FcBody = {
        field,
        val
    }
    const upFc: Fc = await httpService.put(`fc/${fcId}?tower=${towerName}`, body)
    return upFc
}

function getFlNums(lengt: number): string[] {
    const flNums: string[] = []
    for (var i = 0; i < lengt; i++) {
        const strNum: string = '' + i
        flNums.push(strNum.padStart(2, '0'))
    }
    return flNums
}