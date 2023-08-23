import {PostType, ProfilePageType, RootACType} from "./store";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const initialState: ProfilePageType = {
        posts: [
            {id: 1, message: 'Hi! How are you', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Bla', likesCount: 11},
            {id: 4, message: 'Da', likesCount: 11}
        ],
        newPostText: 'it-camasutra'
    }

export const profileReducer = (state: ProfilePageType = initialState, action: RootACType) : ProfilePageType => {
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