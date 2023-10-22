import React from 'react';
import {connect} from 'react-redux';
import {AppRootType} from 'Redux/redux-store';
import {
    followSuccess,
    followUsersCT,
    getUsersCT,
    setCurrentPage,
    toggleIsProgressed,
    unfollowSuccess,
    unfollowUsersCT,
    UsersType
} from 'Redux/users-reducer';
import {Users} from './Users';
import {Preloader} from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "Redux/users-selectors";

export type UsersAPIProps = {
    users: UsersType[];
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    followSuccess: (userId: number) => void;
    unfollowSuccess: (userId: number) => void;
    setCurrentPage: (currentPge: number) => void
    isFetching: boolean,
    followingInProgress: Array<number>
    getUsersCT: (currentPage: number, pageSize: number) => void
    followUsersCT: (userId: number) => void
    unfollowUsersCT: (userId: number) => void
}


export class UsersContainer extends React.Component<UsersAPIProps, any> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersCT(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsersCT(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   followUsersCT = {this.props.followUsersCT}
                   unfollowUsersCT = {this.props.unfollowUsersCT}/>
            </>
    }
}

const mapStateToProps = (state: AppRootType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}



export default compose(
    // WithAuthRedirect,
    connect(mapStateToProps, {
    followSuccess,
    unfollowSuccess,
    setCurrentPage,toggleIsProgressed, getUsersCT, followUsersCT, unfollowUsersCT}))(UsersContainer)