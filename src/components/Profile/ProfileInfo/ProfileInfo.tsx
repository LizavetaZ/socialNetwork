import React, {FC} from 'react';
import s from './ProfileInfo.module.css';
import {ProfilePropsType} from "../Profile";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from '../ProfileInfo/ProfileStatusWithHooks';

export const ProfileInfo: FC<ProfilePropsType> = ({profile, status, updateStatus}) => {

    if (!profile) {
        return <Preloader/>
    }
    return (<div>
            <div className={s.descriptionBlock}>
                <img src={profile?.photos.small ?? ''}/>
                <ProfileStatusWithHooks status = {status} updateStatus = {updateStatus} />
            </div>
        </div>
    )
}