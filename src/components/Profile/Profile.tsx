import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";

export type ProfilePropsType = {
   // store: AppRootType
}

export const Profile = (props: ProfilePropsType) => {


    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer />
        </div>
    )
}
