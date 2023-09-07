import React, { ReactElement, useEffect, useRef } from "react"
import { updateUser } from "../services/user.service"
import { User } from "../types/interfaces"

interface Props { user: User, close: () => void }

export function UpdateUser({ user, close }: Props): ReactElement {

    const userPassword = useRef<string>(user.password)
    const authorization = useRef<number>(user.authorization)

    const handleChange = (ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>): void => {
        ev.preventDefault()
        if (ev.currentTarget.name === 'password') userPassword.current = ev.currentTarget.value
        else authorization.current = +ev.currentTarget.value
    }

    const onUpdateUser = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
        ev.preventDefault()
        await updateUser(user.id, userPassword.current, authorization.current)
        close()
    }

    useEffect(() => {
        focusInput()
    }, [])

    const inputElement = useRef<HTMLInputElement>(null)
    const focusInput = () => {
        if (inputElement.current) inputElement.current.focus()
    }

    let group: string
    switch (user.authorization) {
        case 0:
            group = 'View only'
            break
        case 1:
            group = 'Operation'
            break
        case 2:
            group = 'Administration'
            break

        default:
            group = ''
            break
    }

    return <div className="update-user">
        <div className='subtitle'>Update User</div>
        <div className='name-title'>{user.name}</div>

        <form onSubmit={onUpdateUser}>

            <div className="lable">
                <div className="current">
                    Current Password:
                    <p className="password">{user.password}</p>
                </div>
                <div className="line-input">
                    <label htmlFor="">New Password:</label>
                    <input className='input' type='text' name='password' defaultValue={userPassword.current} onChange={handleChange} ref={inputElement} />
                </div>
            </div>

            <div className="lable">
                <div className="current">
                    Current Group:
                    <div className="group">{group}</div>
                </div>
                <div className="line-select">
                    <label htmlFor="">New Group:</label>
                    <select className='select' name='authorisation' onChange={handleChange} defaultValue={'' + user.authorization}>
                        <option value='0'>View only</option>
                        <option value='1'>Operation</option>
                        <option value='2'>Administration</option>
                    </select>
                </div>
            </div>

            <div className="apply">
                <button className='apply-btn'>Apply</button>
            </div>
        </form>
        <button className='close' onClick={close}>X</button>
    </div>
}