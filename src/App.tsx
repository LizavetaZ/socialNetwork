import React, {ComponentType, useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route, RouteComponentProps, withRouter} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {AppRootType} from "Redux/redux-store";
import {initializeApp} from "app-reducer";
import {Preloader} from "components/common/Preloader/Preloader";

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

type OwnPropsType = {}

type AppPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps

const App: React.FC<AppPropsType> = ({ initialized, initializeApp }) => {
    useEffect(() => {
        initializeApp()
    }, [])

    if(!initialized) {
        return <Preloader/>
    }
    return (
        <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Route path="/dialogs" render={() => <DialogsContainer />} />
                <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                <Route path="/users" render={() => <UsersContainer />} />
                <Route path="/login" render={() => <Login />} />
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppRootType): MapStatePropsType => ({
    initialized: state.app.initialized
})

export default compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);