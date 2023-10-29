import React, {ChangeEvent, FC, useState} from 'react';
import s from './ProfileInfo.module.css';
import {ProfilePropsType} from "../Profile";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatusWithHooks} from '../ProfileInfo/ProfileStatusWithHooks';
import userPhoto from "assets/images/user.png";
import {ProfileType} from "components/Profile/ProfileContainer";
import {
    FormProfileDataType,
    ProfileDataFormReduxForm
} from "components/Profile/ProfileInfo/ProfileDataForm";
import {useDispatch} from "react-redux";

export const ProfileInfo: FC<ProfilePropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false)

    const dispatch = useDispatch()

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = async (formData: FormProfileDataType) => {
        const { fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts } = formData;
        const updatedProfile: ProfileType = {
            ...profile,
            fullName,
            lookingForAJob,
            lookingForAJobDescription,
            aboutMe,
            contacts
        };

        try {
            await saveProfile(updatedProfile);
            setEditMode(false);
        } catch (error) {
            dispatch(saveProfile(updatedProfile))
        }
    };

    return <div>
            <div className={s.descriptionBlock}>
                <img src={profile?.photos.large || userPhoto} className={s.mainPhoto}/>
                {isOwner && <div><input type = {'file'} onChange={onMainPhotoSelected}/></div>}
                {editMode ?
                    <ProfileDataFormReduxForm profile={profile} onSubmit = {onSubmit} initialValues = {profile}/> :
                    <ProfileData profile={profile} isOwner = {isOwner} goToEditMode ={() => {setEditMode(true)}}/>}
                <ProfileStatusWithHooks status = {status} updateStatus = {updateStatus} />
            </div>
        </div>
}

export const Contact = ({ contactTitle, contactValue }: { contactTitle: string, contactValue: string }) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    );
};

export const ProfileData = ({profile, isOwner, goToEditMode}: {profile: ProfileType, isOwner: boolean, goToEditMode:() => void}) => {
    return  <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div><b>Looking for a job</b>: {profile.lookingForAJob ? 'yes': 'no'}</div>
        {profile.lookingForAJob &&
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
        }
        <div><b>About me</b>: {profile.aboutMe}</div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map((key) => {
            const contactKey = key as keyof typeof profile.contacts;
            const contactValue = profile.contacts[contactKey];
            return <Contact key={contactKey} contactTitle={contactKey} contactValue={contactValue} />;
        })}
        </div>
    </div>
}

