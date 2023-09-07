import { socketService } from './'

const jerusalemZone = 'Asia/Jerusalem'
var gDate: Date = new Date()

export const startTimeInterval = (): void => {
    setInterval(() => {
        gDate = new Date()
        socketService.emitTime(gDate.toLocaleTimeString('it-IT', { timeZone: jerusalemZone }), gDate.toLocaleDateString("en-GB", { timeZone: jerusalemZone }))
    }, 1000)
}
