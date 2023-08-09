import React, {PropsWithChildren} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Header} from "./components/Header/Header";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import {RootStateType} from "./Redux/state";

type AppPropsType={
    state:RootStateType
    addPost: () => void
    updateNewPostText:(newMessage: string) => void
}

const App = (props: AppPropsType) => {
    return (

            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    {/*<Route path="/dialogs" component={Dialogs}/>*/}
                    {/*<Route path="/profile" component={Profile}/>  */}
                    <Route path="/dialogs" render={() => <Dialogs dialogsPage={props.state.dialogsPage}/>}/>
                    <Route path="/profile" render={() => <Profile profilePage={props.state.profilePage} addPost = {props.addPost} updateNewPostText = {props.updateNewPostText}/>} />
                </div>
            </div>
    );
}

export default App;