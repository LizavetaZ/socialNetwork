import {DialogsPageType, RootACType} from "./store";

const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
const SEND_MESSAGE = 'SEND-MESSAGE'

const initialState: DialogsPageType = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'}],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your IT-camasutra'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
    newMessageBody: ''
}

export const dialogsReducer = (state: DialogsPageType = initialState, action: RootACType): DialogsPageType => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageBody: action.payload.newMessageBody
            };
        }
        case SEND_MESSAGE: {
            const newMessage = {id: 6, message: state.newMessageBody};
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, newMessage]
            };
        }
        default:
            return state;
    }
}

export type updateMessageBodyACType = ReturnType<typeof updateMessageBodyAC>
export type sendMessageACType = ReturnType<typeof sendMessageAC>

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