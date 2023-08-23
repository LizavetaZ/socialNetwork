import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType, RootACType} from "../../Redux/store";
import {sendMessageAC, updateMessageBodyAC} from "../../Redux/dialogs-reducer";

type DialogsType = {
    dialogsPage:DialogsPageType
    dispatch: (action: RootACType) => void
}

export const Dialogs = (props: DialogsType) => {

    let dialogsElement = props.dialogsPage.dialogs.map((d) => {
        return <DialogItem name={d.name} id={d.id} />;
    });

    let messageElement = props.dialogsPage.messages.map((m) => {
        return <Message message={m.message} />;
    });

    let newMessageBody = props.dialogsPage.newMessageBody


    // let addMessage = () => {
    //     props.dispatch(addPostAC(props.newMessageText));
    // }
    //
    const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) =>{
        let newMessageText = e.currentTarget.value
        let action = updateMessageBodyAC(newMessageText);
        props.dispatch(action)
    }

    const onClickMessageSend = () => {
        props.dispatch(sendMessageAC())
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messageElement}</div>
                <div>
                    <div><textarea placeholder={'Enter your message'} onChange={onChangeMessage} value={newMessageBody}/></div>
                    <div><button onClick={onClickMessageSend}>Send</button></div>
                </div>
            </div>
        </div>
    )
}