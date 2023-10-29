import {PostType, ProfilePageType} from "./store";
import {PhotosType, RootACType} from "./users-reducer";
import {ProfilePropsType} from "components/Profile/Profile";
import {Dispatch} from "redux";
import {profileAPI} from "api/api";
import {ProfileType} from "components/Profile/ProfileContainer";
import {AppRootType, ThunkType} from "Redux/redux-store";
import {stopSubmit} from "redux-form";


const initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi! How are you', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Bla', likesCount: 11},
        {id: 4, message: 'Da', likesCount: 11}
    ],
    profile: null,
    status: ''
}

export const profileReducer = (state: ProfilePageType = initialState, action: RootACType): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            let newPost: PostType = {id: 5, message: action.newPostText, likesCount: 0};
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case "SET-USER-PROFILE": {
            return {
                ...state, profile: action.payload.profile
            }
        }
        case "GET-STATUS-PROFILE": {
            return {
                ...state, status: action.payload.status
            }
        }
        case "DELETE-POST": {
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        }
        case "SAVE-PHOTO-SUCCESS": {
            return {...state, profile: {...state.profile, photos: action.payload.photos}}
        }
        default:
            return state;
    }
}


export type addPostACType = ReturnType<typeof addPostAC>
export type setUserProfileACType = ReturnType<typeof setUserProfile>
export type setStatusProfileType = ReturnType<typeof setStatusProfile>
export type deletePostACType = ReturnType<typeof deletePostAC>
export type savePhotoSuccessType = ReturnType<typeof savePhotoSuccess>


export const addPostAC = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        newPostText
    } as const
}

export const deletePostAC = (id: number) => {
    return {
        type: 'DELETE-POST',
        id
    } as const
}

export const setUserProfile = (profile: ProfilePropsType) => {
    return {
        type: 'SET-USER-PROFILE',
        payload: {
            profile
        }
    } as const;
};

export const setStatusProfile = (status: string) => {
    return {
        type: 'GET-STATUS-PROFILE',
        payload: {
            status
        }
    } as const;
};

export const savePhotoSuccess = (photos: PhotosType) => {
    return {
        type: 'SAVE-PHOTO-SUCCESS',
        payload: {
            photos
        }
    } as const;
};

export const getUserProfileTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}

export const getUserStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatusProfile(response.data))
}

export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatusProfile(status))
    }
}

export const savePhoto = (file: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState: () => AppRootType) => {
    const userId = getState().auth.userId as number;
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileTC(userId))
        return Promise.resolve()
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit("edit-profile", {_error: message }));
        return Promise.reject(response.data.messages[0])
    }
};


