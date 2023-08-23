import React, {PropsWithChildren} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Header} from "./components/Header/Header";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Redirect, Route} from "react-router-dom";
import {RootACType, RootStateType} from "./Redux/store";

type AppPropsType={
    state:RootStateType
    // addPost: () => void
    // updateNewPostText:(newMessage: string) => void
    dispatch: (action: RootACType) => void
}

const App = (props: AppPropsType) => {
    return (

            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*<Route path="/dialogs" component={Dialogs}/>*/}
                    {/*<Route path="/profile" component={Profile}/>  */}
                    <Route exact path="/" render={() => <Redirect to="/profile" />} />
                    <Route path="/dialogs" render={() => <Dialogs dialogsPage={props.state.dialogsPage} dispatch = {props.dispatch}/>}/>
                    <Route path="/profile" render={() => <Profile profilePage={props.state.profilePage} dispatch = {props.dispatch}/>}/>
                </div>
            </div>
    );
}

export default App;