import React, { Component } from 'react';
import './App.css';

import Routes from './config/routes'
import Nav from './components/Nav'


class App extends Component {

  state = {
    currentUser: {},
    isAuthenticated: true,
  }
  
  render() {
    return (
      <div className="App">
        <Nav />
        { Routes }
      </div>
    );
  }
}

export default App
