import React from 'react';
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sideBarReducer} from "./sidebar-reducer";
import {RootACType} from "./users-reducer";

export type ProfilePageType = {
    posts: Array<PostType>
    newPostText: string
}
export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageBody: string
}
export type SidebarType = {}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
}

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}

// export const state: RootStateType = {
//     profilePage: {
//         posts: [
//             {id: 1, message: 'Hi! How are you', likesCount: 12},
//             {id: 2, message: 'It\'s my first post', likesCount: 11},
//             {id: 3, message: 'Bla', likesCount: 11},
//             {id: 4, message: 'Da', likesCount: 11}
//         ],
//         newPostText: 'it-camasutra'
//     },
//     dialogsPage: {
//         dialogs: [
//             {id: 1, name: 'Dimych'},
//             {id: 2, name: 'Andrey'},
//             {id: 3, name: 'Sveta'},
//             {id: 4, name: 'Sasha'},
//             {id: 5, name: 'Victor'},
//             {id: 6, name: 'Valera'}],
//         messages: [
//             {id: 1, message: 'Hi'},
//             {id: 2, message: 'How is your IT-camasutra'},
//             {id: 3, message: 'Yo'},
//             {id: 4, message: 'Yo'},
//             {id: 5, message: 'Yo'},
//             {id: 6, message: 'Yo'}]
//     },
//     sidebar: {}
// }


// export const addPost = () => {
//     let newPost = {id: 5, message: state.profilePage.newPostText, likesCount: 0}
//     state.profilePage.posts.push(newPost)
//     state.profilePage.newPostText = ""
//     rerenderEntireTree(state)
// }

// export const updateNewPostText = (newMessage: string) => {
//     state.profilePage.newPostText = newMessage
//     rerenderEntireTree(state)
// }

// export const subscribe = (observer: any) => {
//     rerenderEntireTree = observer
// }//паттерн - observer


export let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi! How are you', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 11},
                {id: 3, message: 'Bla', likesCount: 11},
                {id: 4, message: 'Da', likesCount: 11}
            ],
            newPostText: 'it-camasutra'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Victor'},
                {id: 6, name: 'Valera'}],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your IT-camasutra'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    _callSubscriber(state: RootStateType) {

    },
    getState() {
        return this._state
    },
    subscribe(observer: any) {
        this._callSubscriber = observer
    },
    // addPost() {
    //     let newPost: PostType = {id: 5, message: this._state.profilePage.newPostText, likesCount: 0}
    //     this._state.profilePage.posts.push(newPost)
    //     this._state.profilePage.newPostText = ""
    //     this._callSubscriber(this._state)
    // },
    // updateNewPostText(newText: string) {
    //     this._state.profilePage.newPostText = newText
    //     this._callSubscriber(this._state)
    // },
    dispatch(action: RootACType) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sideBarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }

}











// window.store = store