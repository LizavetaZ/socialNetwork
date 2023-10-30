import React, {ComponentType, useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {AppRootType, store} from "Redux/redux-store";
import {initializeApp} from "app-reducer";
import {Preloader} from "components/common/Preloader/Preloader";
import {withSuspense} from "hoc/WithSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

type MapStatePropsType = {
    initialized: boolean
}

type MapDispatchPropsType = {
    initializeApp: () => void
}

type OwnPropsType = {}

type AppPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps

const App: React.FC<AppPropsType> = ({initialized, initializeApp}) => {


    useEffect(() => {
        initializeApp();
        window.addEventListener('unhandledrejection', catchAllUnhandleErrors);

        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandleErrors);
        };
    }, []);

    const catchAllUnhandleErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        console.log('Some error occured')
    }

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Switch>
                    <Route exact path="/" render={() => <Redirect from="/" to="/profile" />}/>
                    <Route exact path="/dialogs" render={() => {
                        const SuspendedDialogsContainer = withSuspense(DialogsContainer);
                        return <SuspendedDialogsContainer/>;
                    }}/>

                    <Route exact path="/profile/:userId?" render={() => {
                        const SuspendedProfileContainer = withSuspense(ProfileContainer);
                        return <SuspendedProfileContainer/>;
                    }}/>
                    <Route exact path="/users" render={() => <UsersContainer/>}/>
                    <Route exact path="/login" render={() => <Login/>}/>
                    <Route exact path='*' render={() => <div>404 NOT FOUND</div>}/>
                </Switch>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppRootType): MapStatePropsType => ({
    initialized: state.app.initialized
})

let AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);

export let SamuraiJSApp = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}