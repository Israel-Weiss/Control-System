import { User, UserAction } from "../../types/interfaces"

export function login(user: User): UserAction {
    return { type: 'LOGIN', user }
}