
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Nav from './components/Nav'
import Home from './components/Home'
import SignUp from './components/accounts/SignUp'
import Login from './components/accounts/Login'
import Profile from './components/profile/Profile'
import PostForm from './components/posts/PostForm'

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
        <Nav currentUser={this.state.currentUser} handleLogout={this.handleLogout} isAuthed={this.state.isAuthenticated}/>
        <Switch>  
          <Route path="/signup" component={ SignUp }/> 
          <Route path='/login' render={ (props) => <Login {...props} setCurrentUser={this.setCurrentUser} /> } />
          {/* <PrivateRoute path='/addpost' render={(props) => <PostForm {...props} currentUser={this.state.currentUser} /> } /> */}
          <Route path='/addpost' render={(props) => <PostForm {...props} currentUser={this.state.currentUser} /> } />/>
          <PrivateRoute path='/profile/:username' component={ Profile } />
          <Route path="/" component={ Home }/>
            
        </Switch>
      </div>
    );
  }
}

export default App
