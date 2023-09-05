import { ReactElement, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AirPrivew } from "./air-privew"
import { ModalAirMode } from "./modal-air-mode"
import { ModalAirFan } from "./modal-air-fan"
import { ModalAirCom } from "./modal-air-com"
import { ModalPrompt } from "./modal-prompt"
import { getFcsList, update } from "../../services/fc.service"
import { socketService } from "../../services/socket.service"
import { Fc, Fcs, User, State } from "../../services/types"

interface props {
    tower: string,
    floor: string,
    exitFloor: () => void,
    enterFloor: (fl: string) => void
}

export function AirList({ tower, floor, exitFloor, enterFloor }: props): ReactElement {

    useEffect(() => {
        loadFcs()
        socketService.on('fcsList', loadFcs)
        socketService.on(`fcs-${tower}-${floor}`, loadFcs)
        return () => {
            socketService.off('fcsList', loadFcs)
            socketService.off(`fcs-${tower}-${floor}`, loadFcs)
        }
    }, [floor])

    const [fcsList, setFcs] = useState<Fcs>([])

    const loadFcs = async (): Promise<void> => {
        const fcs: Fcs = await getFcsList(tower, floor)
        setFcs(fcs)
    }

    const loggedInUser: User = useSelector((state: State) => state.userModule.loggedInUser)

    const [modalParams, setModalParams] = useState<{ fcId: string, field: string, val: number, max: number }>(
        { fcId: '', field: '', val: 0, max: Infinity }
    )

    const openModal = (fcId: string, field: string, val: number = 0, max: number = Infinity): void => {
        if (loggedInUser.authorization < 1) alert(`Hellow ${loggedInUser.name}! 
        You are not authorized to perform this action. 
        Please login with an authorized user. 
        (Try login with - "name: operator, password: 2222" )`)
        else setModalParams({ fcId, field, val, max })
    }
    const closeModal = (): void => {
        setModalParams({ fcId: '', field: '', val: 0, max: Infinity })
    }

    const openPrompt: boolean = modalParams.field === 'temp-sp' ||
        modalParams.field === 'interval-alarm' ||
        modalParams.field === 'time-alarm' ? true : false

    const onUpdate = async (tower: string, fcId: string, field: string, val: number): Promise<void> => {
        closeModal()
        await update(tower, fcId, field, val)
        loadFcs()
    }

    if (!fcsList) return <div className="fc-list-spinner">
        <i className="fa-solid fa-spinner fa-2xl fa-spin"></i>
    </div>

    const floorNum: number = +floor.replace('fl', '')
    return <div className="fc-list-continer">

        <section className='title-continer'>
            <button className="button go-back" onClick={exitFloor}>Floor menu</button>
            <p>Fan Coil units - Tower {tower} - Floor {floor.replace('fl', '')}</p>
            <div className="arrows">
                <button className="buuton" onClick={() => enterFloor((floorNum + 1).toString().padStart(2, '0'))}>&#8679;</button>
                <button className="buuton" onClick={() => enterFloor((floorNum - 1).toString().padStart(2, '0'))}>&#8681;</button>
            </div>
        </section>
        <section className="background">
            <div className="list">
                <div className="fc-list-menu">
                    <div className="num">Num</div>
                    <div className="description">Description</div>
                    <div className="status">Status</div>
                    <div className="comand">Com</div>
                    <div className="temp">Temp</div>
                    <div className="sp-temp">SP Temp</div>
                    <div className="mode">Mode</div>
                    <div className="fan">Fan</div>
                    <div className="interval-to-alarm">Deviation<br />to alarm</div>
                    <div className="time-to-alarm">Time<br />to alarm</div>
                    <div className="alarm">Alarm</div>
                    <div className="animation">‖‖‖‖</div>
                </div>

                {fcsList.map((fc: Fc) => < AirPrivew fc={fc} openModal={openModal} key={fc._id} />)}

                {openPrompt && < ModalPrompt closeModal={closeModal} onUpdate={onUpdate}
                    towerName={tower} modalParams={modalParams} />}

                {modalParams.field === 'com' && < ModalAirCom closeModal={closeModal}
                    towerName={tower} onUpdate={onUpdate} fcId={modalParams.fcId} />}

                {modalParams.field === 'mode' && < ModalAirMode closeModal={closeModal}
                    towerName={tower} onUpdate={onUpdate} fcId={modalParams.fcId} />}

                {modalParams.field === 'fan' && < ModalAirFan closeModal={closeModal}
                    towerName={tower} onUpdate={onUpdate} fcId={modalParams.fcId} />}
            </div>
        </section>
    </div>
}