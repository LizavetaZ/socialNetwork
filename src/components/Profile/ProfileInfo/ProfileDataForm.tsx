import {ProfileType} from "components/Profile/ProfileContainer";
import React from "react";
import {createField, Input, Textarea} from "components/common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from './ProfileInfo.module.css';

type ProfileDataFormProps = {
    profile: ProfileType;
};

export type ContactsType = {
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
}

export type FormProfileDataType = ContactsType & {
    fullName: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    aboutMe: string;
};

const ProfileDataForm: React.FC<InjectedFormProps<FormProfileDataType, ProfileDataFormProps> & ProfileDataFormProps> = (props) => {
    const { handleSubmit, profile, error } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={s.formSummeryError}>
                {error}
            </div>}
            <div>
                <b>Full name</b>:{" "}
                {createField({
                    placeholder: "Full name",
                    name: "fullName",
                    validators: [],
                    component: Input,
                    text: "",
                })}
            </div>
            <div>
                <b>Looking for a job</b>:
                {createField({
                    placeholder: "",
                    name: "lookingForAJob",
                    validators: [],
                    component: Input,
                    type: "checkbox",
                })}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField({
                    placeholder: "My professional skills",
                    name: "lookingForAJobDescription",
                    validators: [],
                    component: Textarea,
                })}
            </div>
            <div>
                <b>About me</b>:
                {createField({
                    placeholder: "About me",
                    name: "aboutMe",
                    validators: [],
                    component: Textarea,
                })}
            </div>
            <div>
                <b>Contacts</b>:
                {Object.keys(profile.contacts).map((key) => {
                    return <div key={key} className={s.contact}>
                        <b>{key}: {createField({
                            placeholder: key,
                            name: "contacts." + key,
                            validators: [],
                            component: Input,
                        })} </b>
                    </div>
                })}
            </div>
        </form>
    );
};

export const ProfileDataFormReduxForm = reduxForm<FormProfileDataType, ProfileDataFormProps>({
    form: "edit-profile",
})(ProfileDataForm);