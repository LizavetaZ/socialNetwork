import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import {DialogsPageType, PostType, ProfilePageType, RootACType, RootStateType, SidebarType} from "../../Redux/state";

export type ProfilePropsType = {
    profilePage: ProfilePageType
    // addPost: () => void
    // updateNewPostText: (newMessage: string) => void
    dispatch: (action: RootACType) => void
}

export const Profile = (props:ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts  posts={props.profilePage.posts} newPostText = {props.profilePage.newPostText} dispatch = {props.dispatch}/>
        </div>
    )
}
