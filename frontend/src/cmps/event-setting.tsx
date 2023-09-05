import { ReactElement } from "react"

interface Props {
    closeModal: () => void,
    onUpdate: (id: string, field: string) => Promise<void>,
    updateAll: () => Promise<void>,
    id: string
}

export function EventSetting({ closeModal, onUpdate, updateAll, id }: Props): ReactElement {

    return <div className='alarm-setting'>
        <p className='title'>Events setting:</p>

        <button className="m-button cool" onClick={() => onUpdate(id, 'ack')}>Ack Selected</button>
        <button className="m-button cool" onClick={() => onUpdate(id, 'end')}>Force End</button>
        <button className="m-button cool" onClick={() => updateAll()}>Ack All Alarms</button>
        <hr />
        <button className='m-button close' onClick={closeModal}>Cancel</button>
    </div>
}