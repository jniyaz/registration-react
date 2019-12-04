import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className="flex">
                <div className="w-1/3" />
                <div className="w-1/3 shadow-md rounded mt-40 p-4 bg-white">
                    <h3 className="text-lg">Hey, Welcome..</h3>
                </div>
            </div>
        )
    }
}
