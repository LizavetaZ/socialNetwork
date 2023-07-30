import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import {DialogsPageType, PostType, ProfilePageType, RootStateType, SidebarType} from "../../Redux/state";

export type PostsType = {
    profilePage: ProfilePageType
}

export const Profile = (props:PostsType) => {

    return (
        <div>
            <ProfileInfo/>
            <MyPosts  profilePage={props.profilePage} />
        </div>
    )
}
