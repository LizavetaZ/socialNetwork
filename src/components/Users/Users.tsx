import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "Redux/users-reducer";
import {NavLink} from "react-router-dom";
import {Paginator} from "components/common/Paginator/Paginator";
import {User} from "components/Users/User";

type UsersPropsType = {
    users: UsersType[];
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    followingInProgress: Array<number>
    onPageChanged: (pageNumber: number) => void
    followUsersCT: (userId: number) => void
    unfollowUsersCT: (userId: number) => void
}


export const Users = React.memo((props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (
        <div>
            <Paginator pageSize={props.pageSize} totalUsersCount={props.totalUsersCount} currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}/>
            {props.users.map(u => <User key={u.id} user={u} followingInProgress={props.followingInProgress}
                                        followUsersCT={props.followUsersCT} unfollowUsersCT={props.unfollowUsersCT}/>)}
        </div>

    )
})
