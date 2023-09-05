import { ReactElement, useEffect, useRef, useState } from 'react'
import { checkUser } from '../services/user.service'
import userIcon from '../assets/imgs/user.png'
import { User } from "../services/types"

interface Props { login: (user: User) => void, close: () => void }

export function Login({ login, close }: Props): ReactElement {

    const [incorrect, setIncorect] = useState<boolean>(false)

    useEffect(() => {
        focusInput()
    }, [])

    const inputElement = useRef<HTMLInputElement>(null)
    const focusInput = () => {
        if (inputElement.current) inputElement.current.focus()
    }

    const userName = useRef<string>('')
    const userPassword = useRef<string>('')

    const handleChange = (ev: React.FormEvent<HTMLInputElement>) => {
        ev.preventDefault()
        if (ev.currentTarget.name === 'userName') userName.current = ev.currentTarget.value
        else userPassword.current = ev.currentTarget.value
        if (incorrect) setIncorect(false)
    }

    const onCheckUser = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const user = await checkUser(userName.current, userPassword.current)
        if (!user) return setIncorect(true)
        login(user)
        close()
    }

    return <div className="login-continer">
        <p className='title'>Login user</p>
        <form onSubmit={onCheckUser}>
            <label htmlFor="">User name: </label>
            <input className='input' type="text" name='userName' onChange={handleChange} ref={inputElement} />
            <label htmlFor=""> &nbsp; Password: </label>
            <input className='input' type="text" name='password' onChange={handleChange} />
            <button className='ok'>OK</button>
            {incorrect && <p className='incorrect'>Error! name or password is incorrect Please try again</p>}
        </form>
        <img className='icon' src={userIcon} alt="" />
        <button className='close' onClick={close}>X</button>
    </div>
}