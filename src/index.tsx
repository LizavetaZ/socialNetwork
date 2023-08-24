import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {AppRootType, store} from './Redux/redux-store'
import {Provider} from "react-redux";


let rerenderEntireTree = (state: AppRootType) => {
    ReactDOM.render(

        <BrowserRouter>
            <Provider store={store}>
            <App/>
            </Provider>
        </BrowserRouter>,
        document.getElementById('root')
    );
}

rerenderEntireTree(store.getState())

// store.subscribe(rerenderEntireTree)

store.subscribe(() => {
    const state = store.getState();
    rerenderEntireTree(state)
});

