import React, {useRef} from 'react';
import s from './Myposts.module.css';
import Post from "./Post/Post";
import {RootStateType} from "../../../Redux/state";
import {PostsType} from "../Profile";



const MyPosts = (props: PostsType) => {

    let postsElement = props.profilePage.posts.map(p=> <Post message = {p.message} like ={p.likesCount}/>)

    const newPostElement = useRef<HTMLTextAreaElement>(null)

    const addPost = () => {
        const text = newPostElement.current?.value
    }

    return (
        <div className={s.postsBlock}>
          <h3>My post</h3>
            <div>
                <div>
                    <textarea ref = {newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
                {/*<button>Remove</button>*/}
            </div>
            <div className={s.posts}>
                    {/*{posts.map(p=> <Post message = {p.message} like ={p.likesCount}/>)}*/}
                {postsElement}
            </div>
        </div>
    )
}
export default MyPosts;