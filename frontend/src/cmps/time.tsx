import { ReactElement, useEffect, useState } from "react"
import { socketService } from "../services/socket.service"

export function Time(): ReactElement {

    useEffect(() => {
        socketService.on('time', updateTime)
        return () => socketService.off('time')
    }, [])

    const [dateNow, setDate] = useState({
        curTime: '01/01/2000',
        curDate: '00:00:00'
    })

    const updateTime = ({ date, time }: { date: string, time: string }): void => {
        setDate({
            curTime: time,
            curDate: date
        })
    }

    return <div className="time">
        <p>{dateNow.curTime}</p>
        <p>{dateNow.curDate}</p>
    </div>
}