import { useSelector } from "react-redux";
import { removeUser } from "../services/user.service";
import userIcon from '../assets/imgs/user.png'
import { User, State } from "../types/interfaces"

interface Props { user: User, showUpdate: () => void }

export function UserPrivew({ user, showUpdate }: Props) {

    const loggedInUser: User = useSelector((state: State) => state.userModule.loggedInUser)

    const onRemove = (): void => {
        if (loggedInUser.authorization < 2) alert(`Hellow ${loggedInUser.name}! 
        You are not authorized to perform this action. 
        Please login with an authorized user. 
        (Try login with - "name: admin, password: 3333" )`)

        else removeUser(user.id)
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

    return <div className="user-privew">
        <img className='icon' src={userIcon} alt="" />
        <div className="user-name">{user.name}</div>
        <div className="group">{group}</div>
        {!user.default && <div className="update"><button className="btn" onClick={showUpdate}>Update</button></div>}
        {user.default && <div className="delete">Immutable</div>}
        {!user.default && <div className="delete"><button className="btn" onClick={onRemove}>Delete</button></div>}
        {user.default && <div className="delete">Immutable</div>}
    </div>
}