import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Header} from "./components/Header/Header";
import {Redirect, Route} from "react-router-dom";
import {RootACType, RootStateType} from "./Redux/store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";

type AppPropsType={
    state:RootStateType
    // addPost: () => void
    // updateNewPostText:(newMessage: string) => void
    dispatch: (action: RootACType) => void
}

const App = () => {
    return (

            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*<Route path="/dialogs" component={Dialogs}/>*/}
                    {/*<Route path="/profile" component={Profile}/>  */}
                    <Route path="/" render={() => <Redirect to="/profile" />} />
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/profile" render={() => <Profile/>} />
                </div>
            </div>
    );
}

export default App;