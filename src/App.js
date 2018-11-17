
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

import Nav from './components/Nav'
import Home from './components/Home'
import SignUp from './components/accounts/SignUp'
import Login from './components/accounts/Login'
import AuthForms from './components/accounts/AuthForms'
import Profile from './components/profile/Profile'
import PostForm from './components/posts/PostForm'
import Post from './components/posts/Post'
import CitiesContainer from './containers/CitiesContainer'
import CityForm from './components/city/CityForm'
import City from './components/city/City'

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

//For Login/Logout Popup
showPopUp =()=>{
  let signUpPopUp = document.querySelector('.signUpPopUp');
  let logInPopUp = document.querySelector('.logInPopUp');
  let popUp = document.querySelector('.authPopUp');
  if(popUp.style.display === 'none'){
    popUp.style.display = "block";
  } else {
    popUp.style.display = "none";
    signUpPopUp.style.display = "none";
    logInPopUp.style.display = "block";
  }
}

toggleSignUp=()=>{
  let signUpPopUp = document.querySelector('.signUpPopUp');
  let logInPopUp = document.querySelector('.logInPopUp');
  signUpPopUp.style.display = "block";
  logInPopUp.style.display = "none";
}

//Regex for Forms

isOnlyLettersOrNumbers(str){
  const alphanumericRegex = new RegExp("/^[a-zA-Z0-9]+$/");
  return alphanumericRegex.test(str)
}

isValidName(str){
  const cityRegex = new RegExp("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$");
  return cityRegex.test(str);
}

isValidPassword(str){
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  return strongRegex.test(str);
}

isValidEmail(str){
  const emailRegex = new RegExp(`	
  ^([\w\-\.]+)@((\[([0-9]{1,3}\.){3}[0-9]{1,3}\])|(([\w\-]+\.)+)([a-zA-Z]{2,4}))$`);
  return emailRegex.test(str);
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

        <Nav showPopUp={this.showPopUp} currentUser={this.state.currentUser} handleLogout={this.handleLogout} isAuthed={this.state.isAuthenticated}/>
        {
              !this.props.isAuthed
              &&
        <div className="popUp authPopUp">
          <div className="popUpClose" onClick={this.showPopUp}><i className="far fa-window-close"></i></div>
          <div className="logInPopUp">
            <Login {...this.props} setCurrentUser={this.setCurrentUser} />
            <p>Need an account? <span className="toggleSignUp" onClick={this.toggleSignUp}>Sign Up!</span></p>

          </div>
          <div className="signUpPopUp">
            <SignUp {...this.props} setCurrentUser={this.setCurrentUser} />
          </div>
        </div>
      }
        <Switch>
        <Route path="/authForms" render={ (props) => <AuthForms {...props} setCurrentUser={this.setCurrentUser} /> }/>
          <Route path="/signup" render={ (props) => <SignUp {...props} setCurrentUser={this.setCurrentUser} isValidName={this.isValidName} isOnlyLettersOrNumbers={this.isOnlyLettersOrNumbers} isValidEmail={this.isValidEmail} isValidPassword={this.isValidPassword} isValidName={this.isValidName}/> }/>
          <Route path='/login' render={ (props) => <Login {...props} setCurrentUser={this.setCurrentUser} /> } />
          <Route path='/addpost' render={(props) => <PostForm {...props} currentUser={this.state.currentUser} /> } />/>
          <Route path='/post/:id' component={Post}/>
          <Route path='/addcity' render={(props) => <CityForm {...props} isValidName={this.isValidName}/> }/>
          <Route path='/city/:name' component={City}/>
          <Route path='/cities' render={(props)=><CitiesContainer {...props} isValidName={this.isValidName} showPopUp={this.showPopUp} currentUser={this.state.currentUser}/>}/>
          <PrivateRoute path='/profile/:username' component={ Profile } />
          <Route path="/" component={ Home }/>

        </Switch>
      </div>
    );
  }
}

export default App
