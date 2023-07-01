import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (<div className={s.content}>
            <div>
                <img
                    src='https://t4.ftcdn.net/jpg/01/04/78/75/360_F_104787586_63vz1PkylLEfSfZ08dqTnqJqlqdq0eXx.jpg'/>
            </div>
            <MyPosts/>
        </div>
    )
}
export default Profile;