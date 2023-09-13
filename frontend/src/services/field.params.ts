import { ModeTxt, ModeClass, FanTxt, FanClass, ComTxt, ComClass, StatusTxt, StatusClass, AlarmTxt, AlarmClass } from '../types/enums'

const mode: { txt: ModeTxt, class: ModeClass }[] = [
    { txt: ModeTxt.Cool, class: ModeClass.Cool },
    { txt: ModeTxt.Heat, class: ModeClass.Heat },
    { txt: ModeTxt.Fan, class: ModeClass.Fan },
    { txt: ModeTxt.Auto, class: ModeClass.Auto }
]

const fan: { txt: FanTxt, class: FanClass }[] = [
    { txt: FanTxt.High, class: FanClass.High },
    { txt: FanTxt.Medium, class: FanClass.Medium },
    { txt: FanTxt.Low, class: FanClass.Low },
    { txt: FanTxt.Auto, class: FanClass.Auto }
]

const com: { txt: ComTxt, class: ComClass }[] = [
    { txt: ComTxt.Off, class: ComClass.Off },
    { txt: ComTxt.On, class: ComClass.On },
    { txt: ComTxt.Auto, class: ComClass.Auto }
]

const status: { txt: StatusTxt, class: StatusClass }[] = [
    { txt: StatusTxt.Off, class: StatusClass.Off },
    { txt: StatusTxt.On, class: StatusClass.On }
]

const alarm: { txt: AlarmTxt, class: AlarmClass }[] = [
    { txt: AlarmTxt.Ok, class: AlarmClass.Ok },
    { txt: AlarmTxt.Alarm, class: AlarmClass.Alarm },
    { txt: AlarmTxt.Delay, class: AlarmClass.Ok }
]

export {
    mode,
    fan,
    com,
    status,
    alarm,
}
