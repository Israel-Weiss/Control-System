import { ReactElement, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { Time } from "./time"
import { Login } from "./login"
import { checkUser } from '../services/user.service'
import { login } from "../store/actions/user.action"
import { User, State } from "../services/types"


import userIcon from '../assets/imgs/users.jpg'
import alarm from '../assets/imgs/alarm_h.jpg'
import manage from '../assets/imgs/manage2.jpg'
import main from '../assets/imgs/main.jpg'
import fan from '../assets/imgs/control2.jpg'
import about from '../assets/imgs/about2.jpg'

export function Header(): ReactElement {

    useEffect(() => {
        loadDefaultUser()
    }, [])

    const loggedInUser: User = useSelector((state: State) => state.userModule.loggedInUser)

    const dispach = useDispatch()

    const loadDefaultUser = async (): Promise<void> => {
        const user: User = await checkUser('Operator', '2222')
        onLogin(user)
    }

    const onLogin = (user: User): void => {
        dispach(login(user))
    }

    const [showLogin, setShowLogin] = useState<boolean>(false)
    const toggleShowLogin: () => void = () => setShowLogin(!showLogin)

    let userName = ''
    if (loggedInUser) userName = loggedInUser.name

    return <div className="header-continer">
        <div className="time-continer">
            <p>System time</p>
            <Time />
        </div>
        <div className="header-title-continer">
            <div className="header-title">
                <p>CONTROL SYSTEM</p>
                <h1>FAN COIL UNITS</h1>
            </div>
        </div>
        <div className="menu-buttons">

            <Link to={'/'}><button className="button main-screen">
                <img src={main} className="img" alt="" />
                <p>Main screen</p>
            </button></Link>

            <Link to={'air'}><button className="button rooms">
                <img src={fan} className="img" alt="" />
                <p>Room control</p>
            </button></Link>

            <Link to={'about'}><button className="button about">
                <img src={about} className="img" alt="" />
                <p>About</p>
            </button></Link>

            <Link to={'event'}><button className="button events">
                <img src={alarm} className="img" alt="" />
                <p>Events summary</p>
            </button></Link>

            <Link to={'user'}><button className="button edit">
                <img src={manage} className="img" alt="" />
                <p>User Management</p>
            </button></Link>

            <button className="button menu-login" onClick={toggleShowLogin} >
                <div className="icon-continer">
                    <div className="text">Login user</div>
                    <img className="icon" src={userIcon} alt="" />
                </div>
                <div className="display">{userName}</div>
            </button>

        </div>
        {showLogin && <Login login={onLogin} close={toggleShowLogin} />}
    </div>
}