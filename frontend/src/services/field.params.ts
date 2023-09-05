type Params = {txt: string, class: string}[]

const mode: Params = [
    {txt: 'COOL', class: "cool"},
    {txt: 'HEAT', class: "heat"},
    {txt: 'FAN', class: "fan"},
    {txt: 'AUTO', class: "auto"}
]

const fan: Params = [
    {txt: 'High', class: "high"},
    {txt: 'Medium', class: "medium"},
    {txt: 'Low', class: "low"},
    {txt: 'Auto', class: "auto"}
]

const com: Params = [
    {txt: 'OFF', class: "off"},
    {txt: 'ON', class: "on"},
    {txt: 'AUTO', class: "auto"}
]

const status: Params = [
    {txt: 'OFF', class: "off"},
    {txt: 'ON', class: "on"}
]

const alarm: Params = [
    {txt: 'OK', class: "ok"},
    {txt: 'ALARM', class: "alarm"},
    {txt: 'OK*', class: "ok"}
]

export {
    mode,
    fan,
    com,
    status,
    alarm,
}
