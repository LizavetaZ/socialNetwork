import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import {RootStateType} from "./Redux/store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {RootACType} from "./Redux/users-reducer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {useSelector} from "react-redux";
import {AppRootType} from "./Redux/redux-store";
import UsersContainer from "./components/Users/UsersContainer";

type AppPropsType={
    state:RootStateType
    // addPost: () => void
    // updateNewPostText:(newMessage: string) => void
    dispatch: (action: RootACType) => void
}

const App = () => {

    return (

            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>} />
                    <Route path="/users" render={() => <UsersContainer/>} />
                </div>
            </div>
    );
}

export default App;