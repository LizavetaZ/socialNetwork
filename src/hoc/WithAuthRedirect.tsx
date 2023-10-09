import React, {ComponentType, ReactNode} from 'react';
import {Redirect} from "react-router-dom";
import {AppRootType} from "../Redux/redux-store";
import {connect} from "react-redux";

type MapStatePropsType = {
    isAuth: boolean
}

let mapStateToPropsForRedirect = (state: AppRootType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export function WithAuthRedirect<T>(Component: React.ComponentType<T>) {
    const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
        let { isAuth, ...restProps } = props;
        if (!isAuth) return <Redirect to={'/login'} />;
        return <Component {...restProps as T} />;
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}


