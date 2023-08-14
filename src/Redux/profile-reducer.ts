import {PostType, ProfilePageType, RootACType} from "./state";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

export const profileReducer = (state: ProfilePageType, action: RootACType) : ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {id: 5, message: state.newPostText, likesCount: 0}
            state.posts.push(newPost)
            state.newPostText = ""
            return state
        }
        case UPDATE_NEW_POST_TEXT: {
            state.newPostText = action.payload.newText
            return state
        }
        default: return state
}}


export type addPostACType = ReturnType<typeof addPostAC>
export type onPostChangeACType  = ReturnType<typeof onPostChangeAC>

export const addPostAC = (newPostText: string) => {
    return {
        type: ADD_POST,
        payload: {
            newPostText: newPostText
        }
    } as const
}

export const onPostChangeAC = (newText: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        payload: {
            newText: newText
        }
    } as const;
};