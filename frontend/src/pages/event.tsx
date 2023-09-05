import { useState, useEffect, ReactElement } from "react"
import { getAlarms, update, updateAll } from "../services/alarm.service"
import { EventPrivew } from "../cmps/event-privew"
import { EventSetting } from "../cmps/event-setting"
import { socketService } from "../services/socket.service"
import '@fortawesome/fontawesome-free/css/all.css'
import { useSelector } from "react-redux"
import { Alarm, Alarms } from '../services/types'
import { User, State } from "../services/types"


export function Event(): ReactElement {

    useEffect(() => {
        loadAlarms()
        socketService.on('alarm', loadAlarms)
        return () => socketService.off('alarm')
    }, [])

    const [alarms, setAlarms] = useState<Alarms>([])

    const loadAlarms = async (): Promise<void> => {
        const newList: Alarms = await getAlarms()
        setAlarms(newList)
    }

    const [modalIdAlarm, setModalId] = useState<string>('')

    const loggedInUser: User = useSelector((state: State) => state.userModule.loggedInUser)

    const openModal = (alarmId: string): void =>{
        console.log(loggedInUser);
        if (loggedInUser.authorization < 1) return alert(`Hellow ${loggedInUser.name}! 
        You are not authorized to perform this action. 
        Please login with an authorized user. 
        (Try login with - "name: operator, password: 2222" )`)

        setModalId(alarmId)
    }

    const closeModal = (): void => {
        setModalId('')
    }

    const onUpdate = async (id: string, field: string): Promise<void> => {
        await update(id, field)
        closeModal()
        loadAlarms()
    }

    const onUpdateAll = async (): Promise<void> => {
        await updateAll()
        closeModal()
        loadAlarms()
    }

    if (!alarms) return <div className="event-spinner">
        <i className="fa-solid fa-spinner fa-2xl fa-spin"></i>
    </div>


    return <div className="event">
        <section className='title'>
            Events Summary
        </section>

        <table className="event-table">
            <thead>
                <tr className="event-menu">
                    <th className="start-time">Start Time</th>
                    <th className="end-time">End Time</th>
                    <th className="ack-time">Ack Time</th>
                    <th className="zone">Tower</th>
                    <th className="family">Family</th>
                    <th className="txt">Event text</th>
                </tr>
            </thead>
            <tbody>
                {alarms.map((alarm: Alarm) => < EventPrivew alarm={alarm} openModal={openModal} key={alarm._id} />)}
            </tbody>
        </table>

        {modalIdAlarm &&
            < EventSetting closeModal={closeModal} onUpdate={onUpdate} updateAll={onUpdateAll} id={modalIdAlarm} />}

    </div>
}