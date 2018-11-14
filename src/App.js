import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Routes from './config/routes'
import Nav from './components/Nav'


class App extends Component {

  state = {
    currentUser: {},
    isAuthenticated: true,
  }

  componentDidMount() {
    let token;
    if(localStorage.getItem('jwtToken') === null) {
      this.setState({ isAuthenticated: false })
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      this.setState({ currentUser: token, isAuthenticated: true });
    }
  }

  setCurrentUser = (userData) => {
    // console.log(userData);
    this.setState({ currentUser: userData, isAuthenticated: true })
  }

  handleLogout = () => {
    if(localStorage.getItem('jwtToken') !== null) {
      localStorage.removeItem('jwtToken');
      this.setState({ currentUser: null, isAuthenticated: false });
      // <Redirect to='/' />;
    }
  }
  
  render() {
    console.log('Current User = ', this.state.currentUser);
    console.log('Authenticated = ', this.state.isAuthenticated);

    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        this.state.isAuthenticated === true
          ? <Component {...props} />
          : <Redirect to='/login' />
      )} />
    )

    return (
      <div className="App">
        <Nav />
        { Routes }
      </div>
    );
  }
}

export default App
