import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Header from "./components/Profile/Profile";


const App = () => {
    return (
        <div className='app-wrapper'>
            <Header />
            <Navbar />
            <Profile />
        </div>);
}

export default App;