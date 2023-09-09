import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Header} from "./components/Header/Header";
import {Route} from "react-router-dom";
import { RootStateType} from "./Redux/store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import {RootACType} from "./Redux/users-reducer";

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
                    {/*<Route path="/" render={() => <Redirect to="/profile" />} />*/}
                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>
                    <Route path="/profile" render={() => <Profile/>} />
                    <Route path="/users" render={() => <UsersContainer/>} />
                </div>
            </div>
    );
}

export default App;