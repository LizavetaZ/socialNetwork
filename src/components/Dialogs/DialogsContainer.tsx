import React from 'react';
import {sendMessageAC, updateMessageBodyAC} from "../../Redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../Redux/redux-store";


export const DialogsContainer = () => {

    const dispatch = useDispatch()

    let stateForDialogs = useSelector((state:AppRootType) => state.dialogsPage)

    const onChangeMessage = (newMessageText: string) =>{
        let action = updateMessageBodyAC(newMessageText);
        dispatch(action)
    }

    const onClickMessageSend = () => {
        dispatch(sendMessageAC())
    }

    return (
        <Dialogs updateMessageBody={onChangeMessage} sendMessage={onClickMessageSend} dialogsPage={stateForDialogs}/>
    )
}