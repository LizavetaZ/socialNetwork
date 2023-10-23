import {addPostACType, deletePostACType, setStatusProfileType, setUserProfileACType} from "./profile-reducer";
import {sendMessageACType} from "./dialogs-reducer";
import {setUserDataType} from "./auth-reducer";
import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

export type UsersType = {
    id: number,
    photos: {
        small?: string | null,
        large?: string | null
    }
    followed: boolean,
    name: string,
    status: string,
    location: LocationType
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
    isFetching: boolean,
    followingInProgress: Array<number>
}

export const initialUserState: UsersPageType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

export const usersReducer = (state: UsersPageType = initialUserState, action: RootACType): UsersPageType => {
    switch (action.type) {
        case "FOLLOW-USER":
            return {
                ...state, users: updateObjectInArray(state.users, action.payload.userId, 'id', {followed: true})
            }
        case "UNFOLLOW-USER":
            return {
                ...state, users: updateObjectInArray(state.users, action.payload.userId, 'id', {followed: false})
            }
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
        case 'TOGGLE-IS-PROGRESSED':
            return {
                ...state,
                followingInProgress: action.payload.isFetching ? [...state.followingInProgress, action.payload.userId] :
                    [...state.followingInProgress.filter(id => id !== action.payload.userId)]
            }
        default:
            return state;
    }
}

export type RootACType =
    addPostACType
    | sendMessageACType
    | followACType
    | unfollowACType
    | setUsersACType
    | setCurrentPageACType
    | setTotalUsersCountACType
    | toggleIsFetchingACType
    | setUserProfileACType
    | setUserDataType
    | toggleIsProgressedACType
    | setStatusProfileType
    | deletePostACType

export type followACType = ReturnType<typeof followSuccess>
export type unfollowACType = ReturnType<typeof unfollowSuccess>
export type setUsersACType = ReturnType<typeof setUsers>
export type setCurrentPageACType = ReturnType<typeof setCurrentPage>
export type setTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>
export type toggleIsFetchingACType = ReturnType<typeof toggleIsFetching>
export type toggleIsProgressedACType = ReturnType<typeof toggleIsProgressed>

export const followSuccess = (userId: number) => {
    return {
        type: 'FOLLOW-USER',
        payload: {
            userId
        }
    } as const
}

export const unfollowSuccess = (userId: number) => {
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

export const toggleIsProgressed = (isFetching: boolean, userId: number) => {
    return {
        type: 'TOGGLE-IS-PROGRESSED',
        payload: {
            isFetching, userId
        }
    } as const
}

export const getUsersCT = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(currentPage))
    let data = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

const followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsProgressed(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsProgressed(false, userId))
}

export const unfollowUsersCT = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI)
    let actionCreator = unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}

export const followUsersCT = (userId: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI)
    let actionCreator = followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
}


