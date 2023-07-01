import React from 'react';
import s from './Myposts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            My post
            <div>
                <textarea></textarea>
                <button>Add post</button>
                <button>Remove</button>
            </div>
            <div className={s.posts}>
                <Post message = 'Hi! How are you' like = '40'/>
                <Post message = "It's my first post" like = '31'/>
            </div>
        </div>
    )
}
export default MyPosts;