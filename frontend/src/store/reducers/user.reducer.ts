import { User, UserAction } from "../../services/types"

interface UserState { loggedInUser?: User }

const INITIAL_STATE: UserState = {}

export function userReducer(state: UserState = INITIAL_STATE, action: UserAction): UserState {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, loggedInUser: action.user }
        default:
            return state
    }
}
