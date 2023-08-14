import {DialogsPageType, RootACType} from "./state";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

export const dialogsReducer = (state: DialogsPageType, action: RootACType): DialogsPageType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            state.newMessageBody = action.payload.newMessageBody
            return state
        }
        case SEND_MESSAGE: {
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messages.push({id: 6, message: body})
            return state
        }
        default:
            return state
    }
}

export type updateMessageBodyACType  = ReturnType<typeof updateMessageBodyAC>
export type sendMessageACType  = ReturnType<typeof sendMessageAC>

export const updateMessageBodyAC = (newMessageBody: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        payload: {
            newMessageBody: newMessageBody
        }
    } as const;
}

export const sendMessageAC = () => {
    return {
        type: SEND_MESSAGE
    } as const;
}