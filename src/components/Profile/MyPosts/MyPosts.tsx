import React, {ChangeEvent} from 'react';
import s from './Myposts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../Redux/store";


export type MyPostsPropsType = {
    posts: PostType[]
    addPost: ()=> void
    newPostText: string
    updateNewPostText: (newMessage: string) => void
}




export const MyPosts = (props: MyPostsPropsType) => {

    let postsElement = props.posts.map(p=> <Post key = {p.id} message = {p.message} like ={p.likesCount}/>)

    let onAddPost = () => {
        props.addPost()
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) =>{
        let newText = e.currentTarget.value
        props.updateNewPostText(newText)
    }

    return (
        <div className={s.postsBlock}>
          <h3>My post</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}