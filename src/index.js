import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import {Provider} from 'react-redux';
import Axios from 'axios';
import cookie from 'js-cookie';

const token = cookie('token');
const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App /> 
        </Provider>,
        document.getElementById('root'));
}

if (token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    Axios.post('http://cus-tw.localhost/api/auth/me')
    .then(res => {
        store.dispatch({ type: 'SET_LOGIN', payload: res.data });
        render();
    })
} else {
    render();
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
