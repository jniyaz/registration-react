import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: props.email,
            name: props.name,
            errors: {}
        }
    }

    handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    render() {
        return (
            <div className="flex w-full">
                <aside className="w-1/6 bg-gray-700 h-screen">
                    <ul className="text-white p-4">
                        <Link to="/dashboard">
                            <li className="bg-gray-600 py-1 px-3 mb-2 rounded">Dashboard</li>
                        </Link>
                        <Link to="/profile">
                            <li className="bg-gray-600 py-1 px-3 mb-2 rounded">Profile</li>
                        </Link>
                        <Link to="">
                            <li className="bg-gray-600 py-1 px-3 mb-2 rounded">Logout</li>
                        </Link>
                    </ul>
                </aside>
                <section className="w-5/6 m-2 bg-gray-200 rounded flex justify-center">
                    <form className="w-1/2 border border-gray-600 my-5 px-8 pt-6 pb-8 mb-5 rounded" onSubmit={this.handleForm}>
                        <div className="mb-4">
                            <h4 className="block text-gray-700 text-lg font-bold mb-2 border-b">Update Your Profile</h4>
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
                              value={this.state.name}
                              required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Email"
                              onChange={this.handleInput}
                              value={this.state.email}
                              required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                Phone
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="phone"
                              name="phone"
                              type="text"
                              placeholder="Phone"
                              onChange={this.handleInput}
                               />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="web">
                                Web
                            </label>
                            <input
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="web"
                              name="web"
                              type="text"
                              placeholder="Web"
                              onChange={this.handleInput}
                               />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.auth.user.name,
        email: state.auth.user.email
    }
}

export default connect(mapStateToProps, null)(Profile);