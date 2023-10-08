import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {AuthEnterType} from '../../Redux/auth-reducer';

export type HeaderPropsType = AuthEnterType & DispatchForHeader;

type DispatchForHeader = {
    logoutCT: () => void;
};

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={s.header}>
            <img src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5be01d787b5e5b0001ebb6bb/0x0.png" alt="Logo" />
            <div className={s.loginBlock}>
                {props.isAuth ? (
                    <div>
                        {props.login} - <button onClick={props.logoutCT}>Log Out</button>
                    </div>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
            </div>
        </header>
    );
};