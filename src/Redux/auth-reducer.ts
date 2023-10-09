import {RootACType} from "./users-reducer";
import {authAPI} from "../api/api";
import {ThunkType} from "./redux-store";
import {stopSubmit} from "redux-form";

const initialState: AuthEnterType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export type AuthEnterType = {
    userId: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

export const authReducer = (state = initialState, action: RootACType): AuthEnterType => {
    switch (action.type) {
        case "SET-AUTH-USER-DATA": {
            return {...state, ...action.payload}
        }
        default:
            return state

    }

}


export type setUserDataType = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'SET-AUTH-USER-DATA',
        payload: {
            userId, email, login, isAuth
        }
    } as const
}

export const getAuthUserDataCT = ():ThunkType => (dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
               dispatch(setAuthUserData(id, email, login, true))
            }
        })
}

export const loginCT = (email:string, password:string, rememberMe:boolean): ThunkType => (dispatch) => {
       authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserDataCT())
            } else {
               let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                dispatch(stopSubmit('login', {_error:message}))
            }
        })
}

export const logoutCT = (): ThunkType => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}
