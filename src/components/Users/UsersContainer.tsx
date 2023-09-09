import React from 'react';
import {connect} from "react-redux";
import {AppRootType} from "../../Redux/redux-store";
import {Dispatch} from "redux";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersType
} from "../../Redux/users-reducer";
import axios from "axios";
import {Users} from "./Users";

export type UsersAPIProps = {
    users: UsersType[];
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    setUsers: (users: UsersType[]) => void;
    setCurrentPage: (currentPge: number) => void
    setTotalUsersCount:(totalUsersCount: number) => void
};


export class UsersContainer extends React.Component<UsersAPIProps, any> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }

    onPageChanged = (pageNumber:number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} currentPage={this.props.currentPage} onPageChanged = {this.onPageChanged} users = {this.props.users} follow={this.props.follow} unfollow={this.props.unfollow}/>
    }
}

const mapStateToProps = (state: AppRootType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return{
      follow: (userId: number) => {
            dispatch(followAC(userId))
      },
      unfollow: (userId: number) => {
          dispatch(unfollowAC(userId))
      },
      setUsers: (users:UsersType[]) => {
          dispatch(setUsersAC(users))
      },
      setCurrentPage: (currentPge: number) => {
          dispatch(setCurrentPageAC(currentPge))
      },
      setTotalUsersCount: (totalUsersCount: number) => {
          dispatch(setTotalUsersCountAC(totalUsersCount))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)