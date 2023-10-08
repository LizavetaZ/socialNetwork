import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../Redux/store";
import {Field, InjectedFormProps, reduxForm, reset} from "redux-form";
import {Redirect} from "react-router-dom";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

export type DialogsType = {
    dialogsPage: DialogsPageType
    sendMessage: (value:string) => void
    isAuth: boolean
}

export const Dialogs = (props: DialogsType) => {

    let dialogsState = props.dialogsPage

    let dialogsElement = props.dialogsPage.dialogs.map((d) => {
        return <DialogItem name={d.name} id={d.id} key={d.id}/>;
    });

    let messageElement = props.dialogsPage.messages.map((m) => {
        return <Message message={m.message} key={m.id}/>;
    });

    const addNewMessage = (values: { newMessageBody: string }) => {
       // alert(values.newMessageBody)
        const {newMessageBody} = values
        props.sendMessage(newMessageBody)
    }

    if (props.isAuth) {
        return <Redirect to={"/login"} />;
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                <div>{messageElement}</div>
            </div>
            <AddMessageFormRedux onSubmit = {addNewMessage}/>
        </div>
    )
}


type AddMessagePropsType = {
    handleSubmit: (values: { newMessageBody: string }) => void;
    newMessageBody: string;
};

const maxLength100 = maxLengthCreator(100)


export const AddMessageForm : React.FC<InjectedFormProps<AddMessagePropsType>> =(props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newMessageBody" placeholder="Enter your message" validate = {[required, maxLength100]} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
};

const AddMessageFormRedux = reduxForm<AddMessagePropsType>({form:'dialogAddMessageForm'})(AddMessageForm)
