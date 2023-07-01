import React from 'react';
import s from './Post.module.css';

const Post = (props:any) => {
    return (
        <div className={s.item}>
            <img src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos.jpg"/>
            {props.message}
            <div><span>{props.like} like</span></div>
        </div>
    )
}
export default Post;