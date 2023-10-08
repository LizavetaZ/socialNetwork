import React from 'react';
import s from './Myposts.module.css';
import Post from "./Post/Post";
import {PostType} from "../../../Redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


export type MyPostsPropsType = {
    posts: PostType[]
    addPost: (newPostText: string)=> void
}




export const MyPosts = (props: MyPostsPropsType) => {

    let postsElement = props.posts.map(p=> <Post key = {p.id} message = {p.message} like ={p.likesCount}/>)

    let onAddPost = (values:{newPostText: string}) => {
        let {newPostText} = values
        props.addPost(newPostText)
    }

    return (
        <div className={s.postsBlock}>
          <h3>My post</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElement}
            </div>
        </div>
    )
}

type AddNewPostFormType = {
    handleSubmit: (values: { newPostText: string }) => void;
    newPostText: string;
}

const maxLength30 = maxLengthCreator(30)

export const AddNewPostForm : React.FC<InjectedFormProps<AddNewPostFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newPostText" validate = {[required, maxLength30]} placeholder = {'Post message'}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
};

const AddNewPostFormRedux = reduxForm<AddNewPostFormType>({form:'profileAddNewPostForm'})(AddNewPostForm)