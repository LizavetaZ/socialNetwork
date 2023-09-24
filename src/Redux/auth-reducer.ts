import {AppRootType} from "./redux-store";
import {RootACType} from "./users-reducer";
import {authAPI} from "../api/api";
import {Dispatch} from "redux";

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
            return {...state, ...action.payload, isAuth: true}
        }
        default:
            return state

    }

}


export type setUserDataType = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (userId: number, email: string, login: string) => {
    return {
        type: 'SET-AUTH-USER-DATA',
        payload: {
            userId, email, login
        }
    } as const
}

export const getAuthUserDataCT = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                let {id, email, login} = response.data.data
               dispatch(setAuthUserData(id, email, login))
            }
        })
}

