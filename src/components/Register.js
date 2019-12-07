import React, { Component } from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import Error from './shared/Error'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        }
    }
    handleForm = (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email, 
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        axios.post("http://cus-tw.localhost/api/auth/register", data)
        .then(res => {
            cookie.set('token', res.data.access_token);
            cookie.set('user', res.data.user);
            if(res.data.access_token != null) {
                this.props.history.push('/profile');
            }
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
                <div className="w-1/3 shadow-md rounded mt-20 p-4 bg-white">
                    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={this.handleForm}>
                        <div className="mb-4">
                            <h4 className="block text-gray-700 text-lg font-bold mb-2 border-b">Register</h4>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Name
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Name"
                              onChange={this.handleInput}
                              />
                              <Error error={this.state.errors['name'] ? this.state.errors['name'] : null} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Email
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Email"
                              onChange={this.handleInput}
                              />
                              <Error error={this.state.errors['email'] ? this.state.errors['email'] : null} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              id="password1"
                              type="password"
                              name="password"
                              placeholder="***********"
                              onChange={this.handleInput}
                              />
                            <Error error={this.state.errors['password'] ? this.state.errors['password'] : null} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Confirm Password
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                              id="password2"
                              name="password_confirmation"
                              type="password"
                              placeholder="***********"
                              onChange={this.handleInput}
                              />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit">
                                Register
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
