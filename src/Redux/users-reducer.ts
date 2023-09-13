import {addPostACType, onPostChangeACType} from "./profile-reducer";
import {sendMessageACType, updateMessageBodyACType} from "./dialogs-reducer";

export type UsersType = {
    id: number,
    photos: {
        small?: string | null,
        large?: string | null
    }
    followed: boolean,
    name: string,
    status: string,
    location:LocationType
}

export type LocationType = {
    city: string,
    country: string
}

export type UsersPageType = {
    users: UsersType[]
    pageSize: number
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean
}

const initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

export const usersReducer = (state: UsersPageType = initialState, action: RootACType): UsersPageType => {
    switch (action.type) {
        case "FOLLOW-USER":
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: true} : u)}
        case "UNFOLLOW-USER":
            return {...state, users: state.users.map(u => u.id === action.payload.userId ? {...u, followed: false} : u)}
        case "SET-USERS":
            return {...state, users: [...action.payload.users]}
        case "SET-CURRENT-PAGE":
            return {
                ...state, currentPage: action.payload.currentPage
            }
        case 'SET-TOTAL-USERS-COUNT':
            return {
        ...state, totalUsersCount: action.payload.totalUsersCount
            }
        case 'TOGGLE-IS-FETCHING':
            return {
                ...state, isFetching: action.payload.isFetching
            }
        default:
            return state;
    }
}

export type RootACType = addPostACType | onPostChangeACType | updateMessageBodyACType | sendMessageACType | followACType | unfollowACType | setUsersACType | setCurrentPageACType | setTotalUsersCountACType | isFetchingACType

export type followACType = ReturnType<typeof followAC>
export type unfollowACType = ReturnType<typeof unfollowAC>
export type setUsersACType = ReturnType<typeof setUsersAC>
export type setCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>
export type isFetchingACType = ReturnType<typeof isFetchingAC>

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

export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        payload: {
            currentPage
        }
    } as const
}

export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        payload: {
            totalUsersCount
        }
    } as const
}

export const isFetchingAC = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        payload: {
            isFetching
        }
    } as const
}