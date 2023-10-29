import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "./ProfileContainer";
import {updateStatusTC} from "../../Redux/profile-reducer";
import {FormProfileDataType} from "components/Profile/ProfileInfo/ProfileDataForm";

export type ProfilePropsType = {
   profile: null | ProfileType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (formData: FormProfileDataType) => void
}

export const Profile = (props: ProfilePropsType) => {
    console.log('profile')
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} profile = {props.profile} status = {props.status} updateStatus = {props.updateStatus} savePhoto={props.savePhoto} saveProfile = {props.saveProfile}/>
            <MyPostsContainer />
        </div>
    )
}
