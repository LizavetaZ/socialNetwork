import React from 'react';

export type ProfilePageType =  {
    posts: Array<PostType>
}
export type DialogsPageType =  {
    dialogs: DialogType[]
    messages: MessageType[]
}
export type SidebarType = {

}
export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar:SidebarType
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

export const state :  RootStateType = {
    profilePage:{posts: [
                {id: 1, message: 'Hi! How are you', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Bla', likesCount: 11},
            {id: 4, message: 'Da', likesCount: 11}
        ]},
    dialogsPage:{ dialogs: [
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
            {id: 5, message: 'Yo'},
            {id: 6, message: 'Yo'}]},
    sidebar:{}
}