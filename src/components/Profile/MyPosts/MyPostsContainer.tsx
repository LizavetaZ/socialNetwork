import React from 'react';
import {addPostAC, onPostChangeAC} from "../../../Redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppRootType} from "../../../Redux/redux-store";


let mapStateToProps = (state: AppRootType) => {  //данные из стейта
    return {
        posts: state.profilePage.posts,
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

