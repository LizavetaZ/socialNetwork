import {addPostAC} from "../../../Redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppRootType} from "../../../Redux/redux-store";


let mapStateToProps = (state: AppRootType) => {  //данные из стейта
    return {
        posts: state.profilePage.posts
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {  //коллбэки
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostAC(newPostText));
        }
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

