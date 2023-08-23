import React, {ChangeEvent, useRef} from 'react';
import s from './Myposts.module.css';
import Post from "./Post/Post";
import {PostType, RootACType, RootStateType} from "../../../Redux/store";
import {addPostAC, onPostChangeAC} from "../../../Redux/profile-reducer";


export type MyPostsPropsType = {
    posts: PostType[]
    // addPost: ()=> void
    newPostText: string
    // updateNewPostText: (newMessage: string) => void
    dispatch: (action: RootACType) => void
}




const MyPosts = (props: MyPostsPropsType) => {

    let postsElement = props.posts.map(p=> <Post key = {p.id} message = {p.message} like ={p.likesCount}/>)

    // let newPostElement = React.createRef<HTMLTextAreaElement>() //раскоментить, если используешь ref, закоментить onPostChange(где есть event), раскоментить textarea c ref

    let addPost = () => {
            props.dispatch(addPostAC(props.newPostText));
    }

    // const onPostChange = () => { //раскоментить, если используешь ref, закоментить onPostChange(где есть event), раскоментить textarea c ref
    //     if (newPostElement.current) {
    //         let text = newPostElement.current.value
    //         props.updateNewPostText(text)
    //     }
    // }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) =>{
        let newText = e.currentTarget.value
        let action = onPostChangeAC(newText);
        props.dispatch(action)
    }

    return (
        <div className={s.postsBlock}>
          <h3>My post</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} value={props.newPostText}/>
                    {/*<textarea ref = {newPostElement} onChange={onPostChange} value={props.newPostText}/>*/}
                    {/*раскоментить, если используешь ref, закоментить onPostChange(где есть event), раскоментить textarea c ref*/}
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