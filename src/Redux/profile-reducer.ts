import {PostType, ProfilePageType} from "./store";
import {RootACType} from "./users-reducer";
import {ProfilePropsType} from "../components/Profile/Profile";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

const initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi! How are you', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Bla', likesCount: 11},
        {id: 4, message: 'Da', likesCount: 11}
    ],
    newPostText: 'it-camasutra',
    profile: null
}

export const profileReducer = (state: ProfilePageType = initialState, action: RootACType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {id: 5, message: state.newPostText, likesCount: 0};
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.payload.newText
            };
        }
        case "SET-USER-PROFILE": {
            return {
                ...state, profile: action.payload.profile
            }
        }
        default:
            return state;
    }
}


export type addPostACType = ReturnType<typeof addPostAC>
export type onPostChangeACType = ReturnType<typeof onPostChangeAC>
export type setUserProfileACType = ReturnType<typeof setUserProfile>

export const addPostAC = () => {
    return {
        type: ADD_POST
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

export const setUserProfile = (profile: ProfilePropsType) => {
    return {
        type: 'SET-USER-PROFILE',
        payload: {
            profile
        }
    } as const;
};

export const getUserProfileCT = (userId: number) => (dispatch: Dispatch) => {
    usersAPI.getProfile(userId)
        .then(response => {
            dispatch(setUserProfile(response.data))
        })
}