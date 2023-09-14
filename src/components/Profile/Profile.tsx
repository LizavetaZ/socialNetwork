import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";

export type ProfilePropsType = {
   profile: null | ProfileType
}

export const Profile = (props: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo profile = {props.profile}/>
            <MyPostsContainer />
        </div>
    )
}
