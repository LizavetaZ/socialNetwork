import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import {DialogsPageType, PostType, ProfilePageType, RootStateType, SidebarType} from "../../Redux/state";

export type ProfilePropsType = {
    profilePage: ProfilePageType
    addPost: () => void
    updateNewPostText: (newMessage: string) => void
}

export const Profile = (props:ProfilePropsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts  posts={props.profilePage.posts}  addPost = {props.addPost} newPostText = {props.profilePage.newPostText} updateNewPostText = {props.updateNewPostText}/>
        </div>
    )
}
