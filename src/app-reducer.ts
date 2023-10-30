import {ThunkType} from "./Redux/redux-store";
import {getAuthUserDataCT} from "./Redux/auth-reducer";

const initialState: AppEnterType = {
    initialized: false
}

export type AppEnterType = {
    initialized: boolean
}

export const appReducer = (state = initialState, action: setInitializedType): AppEnterType => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS": {
            return {...state, initialized: true}
        }
        default:
            return state

    }

}



export type setInitializedType = ReturnType<typeof initializedSuccess>

export const initializedSuccess = () => {
    return {
        type: 'INITIALIZED-SUCCESS'
    } as const
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataCT());

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}