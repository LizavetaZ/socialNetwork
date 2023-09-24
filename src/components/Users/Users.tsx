import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "../../Redux/users-reducer";
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    users: UsersType[];
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
    followingInProgress: Array<number>
    // followSuccess: (userId: number) => void;
    // unfollowSuccess: (userId: number) => void;
    onPageChanged:(pageNumber:number) => void
    followUsersCT: (userId: number) => void
    unfollowUsersCT: (userId: number) => void
}


export const Users = (props: UsersPropsType) => {

    let pagesCount =Math.ceil(props.totalUsersCount/props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }



    return (
        <div>
            <div>
                {pages.map(p => {
                    return  <span className={props.currentPage === p ? styles.selectedPage : ''} onClick={(e) => {props.onPageChanged(p)}}>{p}</span>
                })}
            </div>
            {props.users.map(u =>
                <div key={u.id}>
              <span>
                  <div>
                      <NavLink to={'./profile/' + u.id}><img className={styles.userPhoto} src={u.photos.small != null ? u.photos.small : userPhoto}
                           alt="photo"/></NavLink>
                  </div>
                  <div>
                      {u.followed ? <button disabled={props.followingInProgress.some(id => id===u.id)} onClick={() => {
                          props.unfollowUsersCT(u.id)
                      }}>Unfollow</button> : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                          props.followUsersCT(u.id)
                      }}>Follow</button>}
                  </div>
              </span>
                    <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                  <span>
                      <div>{"u.location.country"}</div>
                      <div>{"u.location.city"}</div>
                    </span>
              </span>
                </div>)}
        </div>
    );
};