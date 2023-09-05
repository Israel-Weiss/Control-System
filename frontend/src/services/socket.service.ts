import io from 'socket.io-client'

const baseUrl: string = (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:3030'

const socketService = createSocketService()

socketService.setup()

function createSocketService() {
    let socket: any
    const socketService = {
        setup() {
            socket = io(baseUrl)
        },
        on(eventName: string, cb: ({ date, time }: { date: string, time: string }) => void) {
            socket.on(eventName, cb)
        },
        off(eventName: string, cb?: () => void) {
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        offAny() {
            if (!socket) return
            else socket.removeAllListeners()
        },
    }
    return socketService
}

export {
    socketService
}
