import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import { connect } from 'react-redux'
import Error from './shared/Error'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '', 
            password: '',
            errors: {}
        }
    }
    handleForm = (e) => {
        e.preventDefault();
        const data = {email: this.state.email, password: this.state.password};
        
        axios.post("http://cus-tw.localhost/api/auth/login", data)
        .then(res => {
            cookie.set('token', res.data.access_token);
            // cookie.set('user', res.data.user);
            
            // dispatch an action to redux store
            this.props.setLogin(res.data.user);

            this.props.history.push('/dashboard');
        })
        .catch(e => this.setState({ errors: e.response.data.errors }));
    }
    handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    render() {
        return (
            <div className="flex">
                <div className="w-1/3" />
                <div className="w-1/3 shadow-md rounded mt-40 p-4 bg-white">
                    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={this.handleForm}>
                        <div className="mb-4">
                            <h4 className="block text-gray-700 text-lg font-bold mb-2 border-b">Please Login</h4>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email
                            </label>
                            <input
                              onChange={this.handleInput}
                              className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              name="email"
                              type="text"
                              placeholder="Email"
                               />
                            <Error error={this.state.errors['email'] ? this.state.errors['email'] : null} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                              onChange={this.handleInput}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              id="password"
                              name="password"
                              type="password"
                              placeholder="**********"
                               />
                            <Error error={this.state.errors['password'] ? this.state.errors['password'] : null} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Sign In
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLogin: (user) => dispatch({
            type: "SET_LOGIN",
            payload: user
        })
    }
}

export default connect(null, mapDispatchToProps)(Login);