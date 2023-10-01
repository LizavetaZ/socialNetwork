import React from 'react';
import {sendMessageAC, updateMessageBodyAC} from "../../Redux/dialogs-reducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {compose, Dispatch} from "redux";
import {AppRootType} from "../../Redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


let mapStateToProps = (state: AppRootType) => {  //данные из стейта
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

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs);
