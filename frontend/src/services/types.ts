export interface Alarm {
    _id: string,
    id: string,
    fc: {
        towerName: string,
        id: string
    },
    alarmStatus: number,
    startTime: string,
    activation: boolean,
    endTime: string | null,
    acknolage: boolean,
    ackTime: string | null,
    display: boolean,
    zone: string,
    family: string,
    txt: string
}
export type Alarms = Alarm[]

export interface Fc {
    id: string,
    _id: string,
    floor: string,
    num: number,
    description: string,
    comand: number,
    status: number,
    temp: number,
    spTemp: number,
    mode: number,
    fan: number,
    intervalToAlarm: number,
    timeToAlarm: number,
    alarm: number,
    tempAlarm: {
        status: number,
        highTempId: null | string,
        lowTempId: null | string
    },
    version: number
}
export type Fcs = Fc[]

export interface User {
    _id: string,
    id: string,
    name: string,
    authorization: number,
    password: string,
    default: boolean
}
export type Users = User[]

export interface State {
    userModule: {
        loggedInUser: User
    }
}

export interface UserAction {
    type: string,
    user: User
}

