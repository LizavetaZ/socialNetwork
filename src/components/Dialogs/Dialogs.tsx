import React from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType, RootStateType} from "../../Redux/state";

type DialogsType = {
    dialogsPage:DialogsPageType
}

export const Dialogs = (props: DialogsType) => {

    let dialogsElement = props.dialogsPage.dialogs.map((d) => {
        return <DialogItem name={d.name} id={d.id} />;
    });

    let messageElement = props.dialogsPage.messages.map((m) => {
        return <Message message={m.message} />;
    });

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
                {/*{dialogs.map(d=> {*/}
                {/*    return <DialogItem name={d.name} id={d.id}/>*/}
                {/*})}*/}
            </div>
            <div className={s.messages}>
                {messageElement}
                {/*{messages.map(m=> {*/}
                {/*    return <Message message={m.message}/>*/}
                {/*})}*/}
            </div>
        </div>
    )
}