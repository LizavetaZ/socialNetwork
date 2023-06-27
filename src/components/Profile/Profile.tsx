import React from 'react';
import s from './Profile.module.css';

const Profile = () => {
    return <div className={s.content}>
        <div>
            <img
                src='https://t4.ftcdn.net/jpg/01/04/78/75/360_F_104787586_63vz1PkylLEfSfZ08dqTnqJqlqdq0eXx.jpg'/>
        </div>
        <div>
            New post
        </div>
        <div className={s.posts}>
        <div className={s.item}>
        post 1
        </div>
        <div className='item'>
        post 2
        </div>
        </div>
        </div>
    }
        export default Profile;