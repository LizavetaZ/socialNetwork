import React from 'react';
import {Users} from "./Users";
import {connect} from "react-redux";
import {AppRootType} from "../../Redux/redux-store";
import {Dispatch} from "redux";
import {followAC, setUsersAC, unfollowAC, UsersType} from "../../Redux/users-reducer";
import {UsersC} from "./UsersC";

const mapStateToProps = (state: AppRootType) => {
    return {
        users: state.usersPage.users
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersC)