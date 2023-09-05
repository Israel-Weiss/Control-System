import { User, UserAction } from "../../services/types"

export function login(user: User): UserAction {
    return { type: 'LOGIN', user }
}