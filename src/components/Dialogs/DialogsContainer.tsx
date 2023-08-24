import React from 'react';
import {sendMessageAC, updateMessageBodyAC} from "../../Redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/store";
import {Dispatch} from "redux";


let mapStateToProps = (state: RootStateType) => {  //данные из стейта
    return {
        dialogsPage:state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {  //коллбэки
    return {
        updateMessageBody: (newMessageText: string) => {
            dispatch(updateMessageBodyAC(newMessageText))
        },
        sendMessage: () => {
            dispatch(sendMessageAC())
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)


// export const DialogsContainer = () => {  //беру store через селектор
//
//     const dispatch = useDispatch()
//
//     let stateForDialogs = useSelector((state:AppRootType) => state.dialogsPage)
//
//     const onChangeMessage = (newMessageText: string) =>{
//         let action = updateMessageBodyAC(newMessageText);
//         dispatch(action)
//     }
//
//     const onClickMessageSend = () => {
//         dispatch(sendMessageAC())
//     }
//
//     return (
//         <Dialogs updateMessageBody={onChangeMessage} sendMessage={onClickMessageSend} dialogsPage={stateForDialogs}/>
//     )
// }