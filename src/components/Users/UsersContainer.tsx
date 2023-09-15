import React from 'react';
import {connect} from 'react-redux';
import {AppRootType} from '../../Redux/redux-store';
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    unfollow,
    UsersType
} from '../../Redux/users-reducer';
import axios from 'axios';
import {Users} from './Users';
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

export type UsersAPIProps = {
    users: UsersType[];
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    setUsers: (users: UsersType[]) => void;
    setCurrentPage: (currentPge: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    isFetching: boolean,
    toggleIsFetching: (isFetching: boolean) => void
}


export class UsersContainer extends React.Component<UsersAPIProps, any> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
                   users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow}
            />
        </>
    }
}

const mapStateToProps = (state: AppRootType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching})(UsersContainer)