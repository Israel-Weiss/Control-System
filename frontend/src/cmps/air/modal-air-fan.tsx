import { ReactElement } from "react"

interface Props {
    closeModal: () => void,
    onUpdate: (tower: string, fcId: string, field: string, val: number) => Promise<void>,
    towerName: string,
    fcId: string
}

export function ModalAirFan({ closeModal, onUpdate, towerName, fcId }: Props): ReactElement {

    return <div className='modal-air-fan'>
        <p className='title'>Set fan:</p>

        <button className="m-button cool" onClick={() => onUpdate(towerName, fcId, 'fan', 2)}>Low</button>
        <button className="m-button cool" onClick={() => onUpdate(towerName, fcId, 'fan', 1)}>Medium</button>
        <button className="m-button cool" onClick={() => onUpdate(towerName, fcId, 'fan', 0)}>High</button>
        <button className="m-button cool" onClick={() => onUpdate(towerName, fcId, 'fan', 3)}>Auto</button>
        <hr />
        <button className='m-button close' onClick={closeModal}>Cancel</button>
    </div>
}