import { ReactElement } from "react"

interface Props {
    closeModal: () => void,
    onUpdate: (tower: string, fcId: string, field: string, val: number) => Promise<void>,
    towerName: string,
    fcId: string
}

export function ModalAirMode({ closeModal, onUpdate, towerName, fcId }: Props): ReactElement {

    return <div className='modal-air-mode'>
        <p className='title'>Set mode:</p>

        <button className="m-button cool" onClick={() => onUpdate(towerName, fcId, 'mode', 0)}>COOL</button>
        <button className="m-button heat" onClick={() => onUpdate(towerName, fcId, 'mode', 1)}>HEAT</button>
        <button className="m-button fan" onClick={() => onUpdate(towerName, fcId, 'mode', 2)}>FAN</button>
        <button className="m-button auto" onClick={() => onUpdate(towerName, fcId, 'mode', 3)}>AUTO</button>
        <hr />
        <button className='m-button close' onClick={closeModal}>Cancel</button>
    </div>
}