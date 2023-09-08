import React from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import axios from "axios";
import {UsersType} from "../../Redux/users-reducer";

export type UsersProps = {
    users: UsersType[];
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    setUsers: (users: UsersType[]) => void;
};


export class Users extends React.Component<UsersProps, any> {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {
        return (
            <div>
                {this.props.users.map(u => <div key={u.id}>
              <span>
                  <div>
                      <img className={styles.userPhoto} src={u.photos.small != null ? u.photos.small : userPhoto}
                           alt="photo"/>
                  </div>
                  <div>
                      {u.followed ? <button onClick={() => {
                          this.props.unfollow(u.id)
                      }}>Unfollow</button> : <button onClick={() => {
                          this.props.follow(u.id)
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
        )
    }
}