import {PostType, ProfilePageType, RootACType} from "./store";

export type UsersType = {
    id: number,
    photoUrl:string,
    followed: boolean,
    fullName: string,
    status: string,
    location:LocationType
}

export type LocationType = {
    city: string,
    country: string
}

export type UsersPageType = {
    users: UsersType[]
}

const initialState: UsersPageType = {
    users: []
}

export const usersReducer = (state: UsersPageType = initialState, action: RootACType): UsersPageType => {
    switch (action.type) {
        case "FOLLOW-USER":
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)}
        case "UNFOLLOW-USER":
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)}
        case "SET-USERS":
            return {...state, users: [...state.users, ...action.payload.users]}
        default:
            return state;
    }
}


export type followACType = ReturnType<typeof followAC>
export type unfollowACType = ReturnType<typeof unfollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>

export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW-USER',
        payload: {
            userId
        }
    } as const
}

export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW-USER',
        payload: {
            userId
        }
    } as const;
};

export const setUsersAC = (users: UsersType[]) => {
    return {
        type: 'SET-USERS',
        payload: {
            users
        }
    } as const
}