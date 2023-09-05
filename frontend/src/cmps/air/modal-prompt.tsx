import { ReactElement, useEffect, useRef } from "react"

interface Props {
    closeModal: () => void,
    onUpdate: (tower: string, fcId: string, field: string, val: number) => Promise<void>,
    towerName: string,
    modalParams: { fcId: string, field: string, val: number, max: number }
}

export function ModalPrompt({ closeModal, onUpdate, towerName, modalParams }: Props): ReactElement {
    const { fcId, field, max } = modalParams

    useEffect(() => {
        focusInput()
    }, [])

    let val = useRef<number>(modalParams.val)
    const inputElement = useRef<HTMLInputElement>(null)
    const focusInput = (): void => {
        if (inputElement.current) inputElement.current.focus()
    }

    function handleChange(ev: React.FormEvent<HTMLInputElement>): void {
        ev.preventDefault()
        val.current = +ev.currentTarget.value
    }

    return <div className='modal-air-prompt'>
        <p className='title'>Set value</p>
        <form onSubmit={() => onUpdate(towerName, fcId, field, +val.current)}>
            <input className="input" type="number" min="0" max={max} onChange={handleChange} defaultValue={modalParams.val} ref={inputElement} />
            <button className='ok'>OK</button>
        </form>
        <button className='close' onClick={closeModal}>X</button>
    </div>
}