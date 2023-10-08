import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {addPostACType, profileReducer} from "./profile-reducer";
import {dialogsReducer, sendMessageACType} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {followACType, setUsersACType, unfollowACType, usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar:sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store

export type AppRootType  = ReturnType<typeof rootReducer>

export type RootACType = addPostACType | sendMessageACType | followACType | unfollowACType | setUsersACType

export type ThunkType = ThunkAction<void, AppRootType, unknown, AnyAction>;