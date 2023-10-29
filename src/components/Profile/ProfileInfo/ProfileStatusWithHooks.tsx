import React, {ChangeEvent, useEffect, useState} from 'react';
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

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

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
               <b>Status</b>: <span onDoubleClick={activateMode}>{status || '---'}</span>
            </div>}
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>}
        </div>
    );
};

