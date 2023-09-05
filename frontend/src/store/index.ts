import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import thunk from "redux-thunk"
import { userReducer } from "./reducers/user.reducer"

const rootReducer = combineReducers({
    userModule: userReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


