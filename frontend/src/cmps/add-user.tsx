import { ReactElement, useState } from "react"
import { addUser } from "../services/user.service"
import { useSelector } from "react-redux"
import { User, State } from "../services/types"

export function AddUser(): ReactElement {

    const [formFields, setFormFields] = useState({
        userName: '',
        userPassword: '',
        authorization: 0
    })

    const loggedInUser: User = useSelector((state: State) => state.userModule.loggedInUser)

    const handleChange = (ev: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        ev.preventDefault()
        const field: string = ev.currentTarget.name

        if (field === 'authorization') setFormFields({ ...formFields, authorization: +ev.currentTarget.value })
        else setFormFields({ ...formFields, [field]: ev.currentTarget.value })
    }

    const onAddUser = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
        ev.preventDefault()

        if (loggedInUser.authorization < 2) alert(`Hellow ${loggedInUser.name}! 
        You are not authorized to perform this action. 
        Please login with an authorized user. 
        (Try login with - "name: admin, password: 3333" )`)
        else if (!formFields.userName) alert('Please set a username!')
        else if (!formFields.userPassword) alert('Please set a password!')

        else {
            await addUser(formFields.userName, formFields.userPassword, formFields.authorization)

            setFormFields({ userName: '', userPassword: '', authorization: 0 })
        }
    }

    return <div className="add-user">
        <p className='subtitle'>Add User</p>

        <form onSubmit={onAddUser}>
            <div className="lable">
                <label htmlFor="">User name: </label>
                <input className='input' id="user-name" type='text' name='userName' onChange={handleChange} value={formFields.userName} />
            </div>

            <div className="lable">
                <label htmlFor=""> &nbsp; Password: </label>
                <input className='input' id="password" type='text' name='userPassword' onChange={handleChange} value={formFields.userPassword} />
            </div>

            <div className="lable">
                <label htmlFor=""> &nbsp; &nbsp; &nbsp; &nbsp;Group: </label>
                <select className='select' id="group" name='authorization' onChange={handleChange} value={formFields.authorization} >
                    <option value='0'>View only</option>
                    <option value='1'>Operation</option>
                    <option value='2'>Administration</option>
                </select>
            </div>

            <div className="lable">
                <button className='apply'>Apply</button>
            </div>
        </form>
    </div>
}