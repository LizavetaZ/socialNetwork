import React from 'react';
import {UsersPageType, UsersType} from "../../Redux/users-reducer";
import {inspect} from "util";
import styles from './Users.module.css'

type UsersProps = {
    users: UsersType[];
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    setUsers: (users: UsersType[]) => void;
};

export const Users = (props: UsersProps) => {
    if(props.users.length === 0) {
        props.setUsers(
            [
                {
                    id: 1,
                    photoUrl: 'https://koolinus.files.wordpress.com/2019/03/avataaars-e28093-koolinus-1-12mar2019.png',
                    followed: false,
                    fullName: 'Dmitry',
                    status: "I'm a boss",
                    location: {city: 'Minsk', country: 'Belarus'}
                },
                {
                    id: 2,
                    photoUrl: 'https://ph-files.imgix.net/5e0e503c-a472-49df-bc46-ba900f51850f.png?auto=format',
                    followed: true,
                    fullName: 'Sasha',
                    status: "I'm a boss too",
                    location: {city: 'Moscow', country: 'Russia'}
                },
                {
                    id: 3,
                    photoUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20210209004403/AVATAR1.png',
                    followed: false,
                    fullName: 'Andrew',
                    status: "I'm a boss too",
                    location: {city: 'Kiev', country: 'Ukraine'}
                },
            ]
        )
    }

    return (
        <div>
            {props.users.map(u => <div key={u.id}>
              <span>
                  <div>
                      <img className={styles.userPhoto} src={u.photoUrl} alt="photo"/>
                  </div>
                  <div>
                      {u.followed ? <button onClick={() => {
                          props.unfollow(u.id)
                      }}>Unfollow</button> : <button onClick={() => {
                          props.follow(u.id)
                      }}>Follow</button>}
                  </div>
              </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                  <span>
                      <div>{u.location.country}</div>
                      <div>{u.location.city}</div>
                    </span>
              </span>
            </div>)}
        </div>
    );
};