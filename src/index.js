import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import Axios from 'axios';
import cookie from 'js-cookie';
import {Provider} from 'react-redux';
import jwt from 'jsonwebtoken';

const jwt_token = 'RuLcWW4ZEBSf3rJ4EuTDKrpRTlLR4qldMpCfx4GGuzQaWdVfQQsY3NFtvhtMGvCx';
let token = cookie.get('token');

// verify a token symmetric
jwt.verify(token, jwt_token, function(err, decoded) {
    if(token) {
        if(err) {
            cookie.remove('token');
            token = null;
        }
        console.log(decoded);
    } else {
        if(decoded != undefined && decoded.iss == 'http://cus-tw.localhost/api/auth/login') {
            cookie.remove('token');
            token = null;
        }
    }
});

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App /> 
        </Provider>,
        document.getElementById('root')
    );
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
