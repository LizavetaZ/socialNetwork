import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {AuthEnterType} from "../../Redux/auth-reducer";

export const Header = (props: AuthEnterType) => {
    return <header className={s.header}>
        <img src='https://s3-eu-west-1.amazonaws.com/tpd/logos/5be01d787b5e5b0001ebb6bb/0x0.png'/>
        <div className={s.loginBlock}>
            {props.isAuth ? props.login :
                <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
}