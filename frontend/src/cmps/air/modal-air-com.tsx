import { ReactElement } from "react"

interface Props {
    closeModal: () => void,
    onUpdate: (tower: string, fcId: string, field: string, val: number) => Promise<void>,
    towerName: string,
    fcId: string
}

export function ModalAirCom({ closeModal, onUpdate, towerName, fcId }: Props): ReactElement {

    return <div className='modal-air-com'>
        <p className='title'>Command:</p>

        <button className="m-button on" onClick={() => onUpdate(towerName, fcId, 'com', 1)}>ON</button>
        <button className="m-button off" onClick={() => onUpdate(towerName, fcId, 'com', 0)}>OFF</button>
        <button className="m-button auto" onClick={() => onUpdate(towerName, fcId, 'com', 2)}>AUTO</button>
        <hr />
        <button className='m-button close' onClick={closeModal}>Cancel</button>
    </div>
}