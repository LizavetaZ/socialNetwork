import React from 'react';
import s from './ProfileInfo.module.css';
import {Profile, ProfilePropsType} from "../Profile";
import {Preloader} from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";

export const ProfileInfo = (props: ProfilePropsType) => {

    if (!props.profile) {
        debugger
        return <Preloader/>
    }
    return (<div>
            {/*<div>*/}
            {/*    <img*/}
            {/*        src='https://t4.ftcdn.net/jpg/01/04/78/75/360_F_104787586_63vz1PkylLEfSfZ08dqTnqJqlqdq0eXx.jpg'/>*/}
            {/*</div>*/}
            <div className={s.descriptionBlock}>
                <img src={props.profile?.photos.small ?? ''}/>
                <ProfileStatus status = {'Hello'}/>
            </div>
        </div>
    )
}