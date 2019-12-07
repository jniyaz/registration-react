import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            email: props.email
        }
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
            <section className="w-5/6 m-2 bg-gray-200 rounded">
                <h1 className="bg-black m-5 text-white text-lx p-5 mt-10 rounded-lg">Welcome {this.state.name}</h1>
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

export default connect(mapStateToProps, null)(Dashboard);