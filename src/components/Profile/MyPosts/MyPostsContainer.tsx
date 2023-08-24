import React from 'react';
import {addPostAC, onPostChangeAC} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";
import {AppRootType} from "../../../Redux/redux-store";
import {useDispatch, useSelector} from "react-redux";


const MyPostsContainer = () => {

    let stateForPosts = useSelector((state: AppRootType)=> state)
    const dispatch = useDispatch()

    let addPost = () => {
        dispatch(addPostAC(stateForPosts.profilePage.newPostText));
    }

    const onPostChange = (newText: string) =>{
        let action = onPostChangeAC(newText);
        dispatch(action)
    }

    return (
        <MyPosts posts={stateForPosts.profilePage.posts}  addPost={addPost} newPostText={stateForPosts.profilePage.newPostText}  updateNewPostText={onPostChange}/>
    )
}
export default MyPostsContainer;
