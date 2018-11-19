import React, {
    Component
} from 'react'
import {
    rootUrl
} from '../../config/constants'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password1: '',
            password2: '',
            city: '',
            profilePic: '#'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.isValidName = this.isValidName.bind(this);
        this.isOnlyLettersOrNumbers = this.isOnlyLettersOrNumbers.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
    }

    isValidName(str) {
        return this.props.isValidName(str);
    }

    isOnlyLettersOrNumbers(str) {
        return this.props.isOnlyLettersOrNumbers(str)
    }

    isValidEmail(str) {
        return this.props.isValidEmail(str)
    }

    isValidPassword(str) {
        return this.props.isValidPassword(str)
    }

    onFormSubmit(e) {
        e.preventDefault();
        let firstName = document.querySelector('#firstName');
        let lastName = document.querySelector('#lastName');
        let username = document.querySelector('#usernameSignUp');
        let email = document.querySelector('#email');
        let city = document.querySelector('#city');
        let password1Field = document.querySelector('#password1');
        let password2Field = document.querySelector('#password2');

        let passwordWarning = document.querySelector(".passwordWarning");
        let password2Warning = document.querySelector(".password2Warning");
        let emailWarning = document.querySelector(".emailWarning");
        let firstNameWarning = document.querySelector(".firstNameWarning");
        let lastNameWarning = document.querySelector(".lastNameWarning");
        let usernameWarning = document.querySelector(".usernameWarning");
        let cityWarning = document.querySelector(".cityWarning");

        let mistakes = false;
        if (!this.isValidPassword(this.state.password1)) {
            mistakes = true;
            password1Field.classList.add('error');
            password2Field.classList.add('error');
            passwordWarning.style.display = "block";
            passwordWarning.innerText = "A password requires at least 1 lowercase letter, 1 uppercase letter, 1 numeric character, 1 special character, and must be 8 characters or longer.";
        }

        if (!this.isValidName(this.state.firstName)) {
            mistakes = true;
            firstName.classList.add('error');
            firstNameWarning.style.display = "block";
            firstNameWarning.innerText = "Invalid name.";
        }

        if (!this.isValidName(this.state.lastName)) {
            mistakes = true;
            lastName.classList.add('error');
            lastNameWarning.style.display = "block";
            lastNameWarning.innerText = "Invalid name.";
        }

        if (!this.isOnlyLettersOrNumbers(this.state.username)) {
            mistakes = true;
            username.classList.add('error');
            usernameWarning.style.display = "block";
            usernameWarning.innerText = "A username can only contain letters and numbers.";
        }

        if (!this.isValidEmail(this.state.email)) {
            mistakes = true;
            email.classList.add('error');
            emailWarning.style.display = "block";
            emailWarning.innerText = "Invalid email.";
        }

        if (!this.isValidName(this.state.city)) {
            mistakes = true;
            city.classList.add('error');
            cityWarning.style.display = "block";
            cityWarning.innerText = "Invalid name.";
        }

        if (this.state.password1 !== this.state.password2) {
            mistakes = true;
            password1Field.classList.add('error');
            password2Field.classList.add('error');
            password2Warning.style.display = "block";
            password2Warning.innerText = "Passwords do not match.";

            console.log('Passwords do not match');
        }

        if (!mistakes) {
            console.log("new user make")
            let newUser = new FormData();
            let date = new Date();
            let joinDate = date.toLocaleDateString();
            newUser.append('firstName', this.state.firstName);
            newUser.append('lastName', this.state.lastName);
            newUser.append('username', this.state.username);
            newUser.append('email', this.state.email);
            newUser.append('city', this.state.city);
            newUser.append('password', this.state.password1);
            newUser.append('profilePic', this.state.profilePic);
            newUser.append('joinDate', joinDate);
            axios({
                    method: 'POST',
                    url: `${rootUrl}/user/signup`,
                    data: newUser,
                    config: {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                })
                .then((res) => {
                    passwordWarning.style.display = "hidden";
                    password2Warning.style.display = "hidden";
                    firstNameWarning.style.display = "hidden";
                    lastNameWarning.style.display = "hidden";
                    cityWarning.style.display = "hidden";
                    emailWarning.style.display = "hidden";
                    usernameWarning.style.display = "hidden";

                    this.props.toggleSignUp();
                    this.props.history.push('/login')
                    console.log('registered')
                })
                .catch((err) => {
                    console.log('denied')
                    console.log(err)
                })
        }


    }

    handleFileUpload(e) {
        const target = e.target;
        const file = target.files[0];
        console.log(file);
        this.setState({
            profilePic: file
        })
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
            return ( 
    <form  encType="multipart/form-data"  id="signupForm" onSubmit={this.onFormSubmit}>
        <label htmlFor="profilePic">Upload a Profile Picture</label>
        <input type="file" accept="image/*" required placeholder="Profile Pic" id="profilePic" name="profilePic" onChange={this.handleFileUpload}/>
        
        <div className="inputField ">
            <label htmlFor="firstName">First Name</label>
            <input type="text" required placeholder="First Name" id="firstName"  name="firstName" onChange={this.handleInputChange}/>
        </div>
        <span className="warning firstNameWarning"> </span>

        <div className="inputField lastNameField">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" required placeholder="Last Name" id="lastName"  name="lastName" onChange={this.handleInputChange}/>

        </div>
        <span className="warning lastNameWarning"> </span>

        <div className="inputField cityField">
            <label htmlFor="city">Your City</label>
            <input type="text" required placeholder="Your City" id="city" name="city" onChange={this.handleInputChange}/>

        </div>
        <span className="warning cityWarning"> </span>

        <div className="inputField emailField">
            <label htmlFor="email">Email</label>
            <input type="email" required placeholder="Email" id="email"  name="email" onChange={this.handleInputChange}/>

        </div>

        <span className="warning emailWarning"> </span>

        <div className="inputField usernameField">
            <label htmlFor="usernameSignUp">Username</label>
            <input type="text" required placeholder="Username" id="usernameSignUp"  name="username" onChange={this.handleInputChange}/>

        </div>
        <span className="warning usernameWarning"> </span>

        <div className="inputField passwordField">
            <label htmlFor="password1">Password</label>
            <input type="password" required placeholder="Password" id="password1" name="password1" onChange={this.handleInputChange}/>
        </div>

        <span className="warning passwordWarning"> </span>

        <div className="inputField">
            <label htmlFor="password2">Re-enter Password</label>
            <input type="password" required placeholder="Re-enter Password" id="password2"  name="password2" onChange={this.handleInputChange}/>

        </div>

        <span className="warning password2Warning"> </span>

        <input type="submit" placeholder="Sign Up!/"/>
    </form>
            )
        }
}   

export default SignUp