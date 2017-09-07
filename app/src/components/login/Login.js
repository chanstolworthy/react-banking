import React, { Component } from 'react';
import './Login.css'
import logo from './communityBank.svg'

export default class extends Component{
    render() {
        console.log(process.env.REACT_APP_LOGIN)
        return(
            <div className='App'>
                <img src={logo} alt='logo' />
                <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a>
            </div>
        )
    }
}
