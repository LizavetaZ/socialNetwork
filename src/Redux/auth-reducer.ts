import {RootACType} from "./users-reducer";
import {authAPI, securityAPI} from "../api/api";
import {AppRootType, ThunkType} from "./redux-store";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";

let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null// if null, then captcha is not required
};

export type AuthEnterType = typeof initialState

export const authReducer = (state = initialState, action: RootACType): AuthEnterType => {
    switch (action.type) {
        case "samurai-network/auth/SET-AUTH-USER-DATA": {
            return {...state, ...action.payload}
        }
        case 'GET-CAPTCHA-URL-SUCCESS' :{
            return {
                ...state, ...action.payload
            }
        }
        default:
            return state

    }

}


export type setUserDataType = ReturnType<typeof setAuthUserData> | ReturnType<typeof getCaptchaUrlSuccess>

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: 'samurai-network/auth/SET-AUTH-USER-DATA',
        payload: {
            userId, email, login, isAuth
        }
    } as const
}

export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    return {
        type: 'GET-CAPTCHA-URL-SUCCESS',
        payload: {
            captchaUrl
        }
    } as const
}

export const getAuthUserDataCT = (): ThunkType => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const loginCT = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
        // success, get auth data
        dispatch(getAuthUserDataCT())
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = (): ThunkType => async(dispatch) =>  {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logoutCT = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}