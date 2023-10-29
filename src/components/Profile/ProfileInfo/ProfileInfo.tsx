import React, {ChangeEvent, FC} from 'react';
import s from './ProfileInfo.module.css';
import {ProfilePropsType} from "../Profile";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from '../ProfileInfo/ProfileStatusWithHooks';
import userPhoto from "assets/images/user.png";

export const ProfileInfo: FC<ProfilePropsType> = ({profile, status, updateStatus, isOwner, savePhoto}) => {

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            savePhoto(e.target.files[0])
        }
    }

    return (<div>
            <div className={s.descriptionBlock}>
                <img src={profile?.photos.large || userPhoto} className={s.mainPhoto}/>
                {isOwner && <div><input type = {'file'} onChange={onMainPhotoSelected}/></div>}
                <ProfileStatusWithHooks status = {status} updateStatus = {updateStatus} />
            </div>
        </div>
    )
}