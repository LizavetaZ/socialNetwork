import {addPostACType, onPostChangeACType, setUserProfileACType} from "./profile-reducer";
import {sendMessageACType, updateMessageBodyACType} from "./dialogs-reducer";
import {setAuthUserData, setUserDataType} from "./auth-reducer";

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

export type RootACType = addPostACType | onPostChangeACType | updateMessageBodyACType | sendMessageACType | followACType | unfollowACType | setUsersACType | setCurrentPageACType | setTotalUsersCountACType | toggleIsFetchingACType | setUserProfileACType | setUserDataType

export type followACType = ReturnType<typeof follow>
export type unfollowACType = ReturnType<typeof unfollow>
export type setUsersACType = ReturnType<typeof setUsers>
export type setCurrentPageACType = ReturnType<typeof setCurrentPage>
export type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export type toggleIsFetchingACType = ReturnType<typeof toggleIsFetching>

export const follow = (userId: number) => {
    return {
        type: 'FOLLOW-USER',
        payload: {
            userId
        }
    } as const
}

export const unfollow = (userId: number) => {
    return {
        type: 'UNFOLLOW-USER',
        payload: {
            userId
        }
    } as const;
};

export const setUsers = (users: UsersType[]) => {
    return {
        type: 'SET-USERS',
        payload: {
            users
        }
    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        payload: {
            currentPage
        }
    } as const
}

export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        payload: {
            totalUsersCount
        }
    } as const
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        payload: {
            isFetching
        }
    } as const
}