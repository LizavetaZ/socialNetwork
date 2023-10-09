import {AppRootType} from "./redux-store";

export const getUsers = (state: AppRootType) => {
    return state.usersPage.users
}

export const getPageSize = (state: AppRootType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppRootType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppRootType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppRootType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppRootType) => {
    return state.usersPage.followingInProgress
}