import React from 'react';
import {connect} from 'react-redux';
import {AppRootType} from '../../Redux/redux-store';
import {
    followSuccess, followUsersCT,
    getUsersCT,
    setCurrentPage,
    toggleIsProgressed,
    unfollowSuccess, unfollowUsersCT,
    UsersType
} from '../../Redux/users-reducer';
import {Users} from './Users';
import {Preloader} from "../common/Preloader/Preloader";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

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
        this.props.getUsersCT(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersCT(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   // followSuccess={this.props.followSuccess}
                   // unfollowSuccess={this.props.unfollowSuccess}
                   followingInProgress={this.props.followingInProgress}
                   followUsersCT = {this.props.followUsersCT}
                   unfollowUsersCT = {this.props.unfollowUsersCT}/>
            </>
    }
}

const mapStateToProps = (state: AppRootType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose<React.ComponentType>(connect(mapStateToProps, {
    followSuccess,
    unfollowSuccess,
    setCurrentPage,toggleIsProgressed, getUsersCT, followUsersCT, unfollowUsersCT}))(UsersContainer)