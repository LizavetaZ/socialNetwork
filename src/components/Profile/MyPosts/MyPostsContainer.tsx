import React from 'react';
import {addPostAC, onPostChangeAC} from "../../../Redux/profile-reducer";
import {MyPosts, MyPostsPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {RootStateType} from "../../../Redux/store";
import {Dispatch} from "redux";


let mapStateToProps = (state: RootStateType) => {  //данные из стейта
    return {
        posts:state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {  //коллбэки
    return {
        addPost: () => {
            dispatch(addPostAC());
        },

        updateNewPostText: (newText: string) => {
            dispatch(onPostChangeAC(newText))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

