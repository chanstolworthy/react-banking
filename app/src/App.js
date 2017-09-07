import React, { Component } from 'react';
import './App.css';
import Login from './components/login/Login'
import Private from './components/private/Private'

import {Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Login}/>
        <Route path='/private' component={Private}/>

      </div>
    );
  }
}

export default App;
