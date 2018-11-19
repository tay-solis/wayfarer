
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
  if(logInPopUp.style.display === "block"){
    signUpPopUp.style.display = "block";
    logInPopUp.style.display = "none";
  } else if(signUpPopUp.style.display === "block"){
    signUpPopUp.style.display = "none";
    logInPopUp.style.display = "block";
  }
}

//Regex for Forms

isOnlyLettersOrNumbers(str){
  const alphanumericRegex = new RegExp("^[a-zA-Z0-9_]*$");
  return alphanumericRegex.test(str)
}

//Validates name. Allows some foreign characters.
isValidName(str){
  const cityRegex = new RegExp("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$");
  return cityRegex.test(str);
}

isValidPassword(str){
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  return strongRegex.test(str);
}

isValidEmail(str){
  const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  return emailRegex.test(str);
}

render() {
  console.log('Current User = ', this.state.currentUser);
  console.log('Authenticated = ', this.state.isAuthenticated);



    return (
      <div className="App">

        <Nav showPopUp={this.showPopUp} currentUser={this.state.currentUser} handleLogout={this.handleLogout} isAuthed={this.state.isAuthenticated}/>
        {
        !this.props.isAuthed
        &&
        //Login and Sign Up popups
        <div className="popUp authPopUp" style={{display:'none'}}>
          <div className="popUpClose" onClick={this.showPopUp}><i className="far fa-window-close"></i></div>
          <div className="logInPopUp">
            <Login {...this.props}
              style={{display:'none'}}
              showPopUp={this.showPopUp}
               setCurrentUser={this.setCurrentUser} />
            <p>Need an account? <span className="toggleSignUp" onClick={this.toggleSignUp}>Sign Up!</span></p>

          </div>
          <div className="signUpPopUp">
            <SignUp {...this.props}
              showPopUp={this.showPopUp} setCurrentUser={this.setCurrentUser}
              toggleSignUp={this.toggleSignUp} isValidName={this.isValidName} isOnlyLettersOrNumbers={this.isOnlyLettersOrNumbers} isValidEmail={this.isValidEmail} isValidPassword={this.isValidPassword}/>
          </div>
        </div>
      }
      <Switch>
          <Route path="/signup" render={ (props) => <SignUp {...props} setCurrentUser={this.setCurrentUser} isValidName={this.isValidName} isOnlyLettersOrNumbers={this.isOnlyLettersOrNumbers} isValidEmail={this.isValidEmail} isValidPassword={this.isValidPassword}/> }/>
          <Route path='/login' render={ (props) => <Login {...props} setCurrentUser={this.setCurrentUser} /> } />
          <Route path='/addpost' render={(props) => <PostForm {...props} currentUser={this.state.currentUser} /> } />/>
          <Route path='/post/:id' render={(props)=> <Post {...props} currentUser={this.state.currentUser}/>}/>
          <Route path='/addcity' render={(props) => <CityForm {...props} isValidName={this.isValidName}/> }/>
          <Route path='/city/:name' component={City}/>
          <Route path='/cities' render={(props)=><CitiesContainer {...props} isValidName={this.isValidName} showPopUp={this.showPopUp} currentUser={this.state.currentUser}/>}/>
          <Route path='/profile/:username' render={(props)=><Profile {...props} currentUser={this.state.currentUser} isValidName={this.isValidName} isOnlyLettersOrNumbers={this.isOnlyLettersOrNumbers} isValidEmail={this.isValidEmail}/>} />
          <Route path="/" component={ Home }/>

      </Switch>
    </div>
    );
  }
}

export default App
