import {combineReducers, createStore} from "redux";
import {addPostACType, onPostChangeACType, profileReducer} from "./profile-reducer";
import {dialogsReducer, sendMessageACType, updateMessageBodyACType} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {followACType, setUsersACType, unfollowACType, usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar:sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

export type AppRootType  = ReturnType<typeof rootReducer>

export type RootACType = addPostACType | onPostChangeACType | updateMessageBodyACType | sendMessageACType | followACType | unfollowACType | setUsersACType