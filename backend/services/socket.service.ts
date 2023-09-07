import * as HTTP from "http"
import { Socket } from "socket.io"

export {
    setupSocketAPI,
    emitRender,
    emitTime
}

var gIo: any

function setupSocketAPI(http: HTTP.Server) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*'
        }
    })
    console.log('setupSocketAPI');
    gIo.on('connection', (socket: Socket) => {
        console.log(`New connected socket ${socket.id}`)
        socket.on('disconnect', () => {
            console.log(`Socket is leaving`);
        })
    })
}

function emitRender(type: string) {
    gIo.emit(type)
}

function emitTime(date: string, time: string) {
    gIo.emit('time', { date, time })
}

