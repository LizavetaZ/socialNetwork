import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css';

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}


export const ProfileStatusWithHooks = (props: ProfileStatusType) => {

    const [status, setStatus] = useState(props.status)

    const [editMode, setEditMode] = useState(false)

    const activateMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateMode}>{status || '---'}</span>
            </div>}
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>}
        </div>
    );
};

