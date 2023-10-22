import React, {FC} from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import {UsersType} from "Redux/users-reducer";
import {NavLink} from "react-router-dom";

type UserPropsType = {
    user: UsersType;
    followingInProgress: Array<number>
    followUsersCT: (userId: number) => void
    unfollowUsersCT: (userId: number) => void
}


export const User: FC<UserPropsType> = ({user, unfollowUsersCT, followUsersCT, followingInProgress }) => {
    return (
        <div>
              <span>
                  <div>
                      <NavLink to={'./profile/' + user.id}>
                          <img className={styles.userPhoto} src={user.photos.small != null ? user.photos.small : userPhoto}
                           alt="photo"/>
                      </NavLink>
                  </div>
                  <div>
                      {user.followed ? <button disabled={followingInProgress.some(id => id===user.id)} onClick={() => {
                          unfollowUsersCT(user.id)
                      }}>Unfollow</button> : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                          followUsersCT(user.id)
                      }}>Follow</button>}
                  </div>
              </span>
                    <span>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                  <span>
                      <div>{"u.location.country"}</div>
                      <div>{"u.location.city"}</div>
                    </span>
              </span>
        </div>
    );
}