import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'js-cookie';

function Layout(props) {
    const handleLogout = (e) => {
        e.preventDefault();
        cookie.remove('token');
        props.logout()
    }
    return (
        <div>
            <nav className="flex justify-between">
                <Link className="py-4 mx-10" to="/">React App</Link>
                <div className="flex justify-between">
                    { 
                    !props.loggedIn  
                    ? (<Fragment>
                            <Link className="m-3 py-2 px-3 rounded inline-block bg-blue-700 text-white" to="/login">Login</Link>
                            <Link className="m-3 py-2 px-3 rounded inline-block bg-blue-700 text-white" to="/register">Register</Link>
                        </Fragment>)
                    : (<Link
                      className="m-3 py-2 px-3 rounded inline-block bg-blue-700 text-white"
                      onClick={handleLogout}
                      to="/logout">Logout</Link>)
                    }
                </div>
            </nav>
            {props.children}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({type: 'SET_LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)