import { httpService } from "./http.service"
import { User } from "../types/interfaces"


export {
    getUsers,
    getUser,
    checkUser,
    addUser,
    updateUser,
    removeUser
}

interface UserBody {name?: string, password: string, authorization: number}

async function getUsers(grup: string | null = null): Promise<User[]> {
    let users: User[] = await httpService.get(`user?grup=${grup}`)
    return users
}

async function getUser(userId: string): Promise<User> {
    let user: User = await httpService.get(`user/${userId}`)
    return user
}

async function checkUser(name: string, password: string): Promise<User> {
    const user: User = await httpService.get(`user/check?userName=${name}&password=${password}`)
    return user
}

async function addUser(name: string, password: string, authorization: number): Promise<User> {
    const body: UserBody = {
        name,
        password,
        authorization
    }
    const user: User = await httpService.post(`user`, body)
    return user
}

async function updateUser(userId: string, password: string, authorization: number): Promise<User> {
    const body: UserBody = {
        password,
        authorization
    }
    const user: User = await httpService.put(`user/${userId}`, body)
    return user
}

async function removeUser(userId: string): Promise<string> {
    const successfully: string = await httpService.delete(`user/${userId}`)
    return successfully
}
