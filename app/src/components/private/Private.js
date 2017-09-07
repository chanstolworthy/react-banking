import React, { Component } from 'react';
import './Private.css'

import {connect} from 'react-redux'

//ACTION CREATOR FROM THE REDUCER
import {getUserInfo} from './../../ducks/user_reducer'

class Private extends Component{
    
    componentDidMount() {
        this.props.getUserInfo()

    }
    //When mounts it triggers the action creator to go get the auth/me endpoint that returns req.user
    
    
    
    render() {
        console.log(this.props.user)
        return(
            <div>
                <h1>Community Bank</h1>
                <div className='accountInfoContainer'>
                    <h4>Account Information</h4>
                     {this.props.user ? <img className='avatar' src={this.props.user.img} alt=" " />
                     : null}
                    <div>
                        <p>username: {this.props.user ? this.props.user.user_name : null}</p>
                        <p>Email: { this.props.user ? this.props.user.email : null}</p>
                        <p>ID: { this.props.user ? this.props.user.id : null}</p>
                        <p>Available Balance: {this.props.user ? '$' + Math.floor((Math.random() + 1234) * 100) + '.00' : null}</p>
                    </div>
                        <a href='http://localhost:3000/auth/logout'><button>Logout</button></a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

let outputActions = {
    getUserInfo: getUserInfo
}

export default connect(mapStateToProps, outputActions)(Private)