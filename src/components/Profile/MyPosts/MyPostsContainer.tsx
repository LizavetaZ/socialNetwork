import React from 'react';
import {addPostAC, onPostChangeAC} from "../../../Redux/profile-reducer";
import {MyPosts, MyPostsPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {RootStateType} from "../../../Redux/store";
import {Dispatch} from "redux";


// const MyPostsContainer = () => { //здесь все получаю через селектор
//
//     let stateForPosts = useSelector((state: AppRootType)=> state)
//     const dispatch = useDispatch()
//
//     let addPost = () => {
//         dispatch(addPostAC(stateForPosts.profilePage.newPostText));
//     }
//
//     const onPostChange = (newText: string) =>{
//         let action = onPostChangeAC(newText);
//         dispatch(action)
//     }
//
//     return (
//         <MyPosts posts={stateForPosts.profilePage.posts}  addPost={addPost} newPostText={stateForPosts.profilePage.newPostText}  updateNewPostText={onPostChange}/>
//     )
// }
// export default MyPostsContainer;


let mapStateToProps = (state: RootStateType) => {  //данные из стейта
    return {
        posts:state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {  //коллбэки
    return {
        addPost: () => {
            dispatch(addPostAC());
        },

        updateNewPostText: (newText: string) => {
            dispatch(onPostChangeAC(newText))
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

