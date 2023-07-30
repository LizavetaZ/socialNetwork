import React from 'react';
import s from './ProfileInfo.module.css';

export const ProfileInfo = () => {
    return (<div>
            <div>
                <img
                    src='https://t4.ftcdn.net/jpg/01/04/78/75/360_F_104787586_63vz1PkylLEfSfZ08dqTnqJqlqdq0eXx.jpg'/>
            </div>
            <div className={s.descriptionBlock}>
                ava + descr
            </div>
        </div>
    )
}