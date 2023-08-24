import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../Redux/store";

type DialogsType = {
    dialogsPage:DialogsPageType
    updateMessageBody:(newMessageText: string) => void
    sendMessage: () => void
}

export const Dialogs = (props: DialogsType) => {

    let dialogsState = props.dialogsPage

    let dialogsElement = props.dialogsPage.dialogs.map((d) => {
        return <DialogItem name={d.name} id={d.id} />;
    });

    let messageElement = props.dialogsPage.messages.map((m) => {
        return <Message message={m.message} />;
    });

    let newMessageBody = props.dialogsPage.newMessageBody


    const onChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) =>{
        let newMessageText = e.currentTarget.value
        props.updateMessageBody(newMessageText)
    }

    const onClickMessageSend = () => {
        props.sendMessage()
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