import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'

class ProfileForm extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            city: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.isValidName = this.isValidName.bind(this);
        this.isOnlyLettersOrNumbers = this.isOnlyLettersOrNumbers.bind(this);
        this.isValidEmail = this.isValidEmail.bind(this);
    }

    // User Validation
    isValidName(str) {
        return this.props.isValidName(str);
    }

    isOnlyLettersOrNumbers(str) {
        return this.props.isOnlyLettersOrNumbers(str)
    }

    isValidEmail(str) {
        return this.props.isValidEmail(str)
    }

    //Creates a put request after input validation — if the user has entered a field incorrectly, they will receive a warning.
    onFormSubmit(e) {
        e.preventDefault();
        let firstName = document.querySelector('#firstName');
        let lastName = document.querySelector('#lastName');
        let email = document.querySelector('#email');
        let city = document.querySelector('#city');

        let emailWarning = document.querySelector(".emailWarning");
        let firstNameWarning = document.querySelector(".firstNameWarning");
        let lastNameWarning = document.querySelector(".lastNameWarning");
        let cityWarning = document.querySelector(".cityWarning");

        let mistakes = false;

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

        if (!mistakes) {

            let updatedProfile = new FormData();
            updatedProfile.append('firstName', this.state.firstName);
            updatedProfile.append('lastName', this.state.lastName);
            updatedProfile.append('email', this.state.email);
            updatedProfile.append('city', this.state.city);
            console.log(`${rootUrl}/user/edit/${this.props.currentUser.username}`)
            console.log("updated user")
            console.log(updatedProfile)
            axios({
                    method: 'PUT',
                    url: `${rootUrl}/user/edit/${this.props.currentUser.username}`,
                    data: updatedProfile,
                    config: {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                })
                .then((res) => {
                    firstNameWarning.style.display = "hidden";
                    lastNameWarning.style.display = "hidden";
                    cityWarning.style.display = "hidden";
                    emailWarning.style.display = "hidden";
                    this.props.showEditProfile();
                    this.props.history.push(`../profile/${this.props.currentUser.username}`)
                })
                .catch((err) => {
                    console.log(err);
                })
        }


    }

    componentDidMount() {
        console.log(this.props.user)
        let editFirstName = document.querySelector('#editFirstName');
        let editLastName = document.querySelector('#editLastName');
        let editEmail = document.querySelector('#editEmail');
        let editCity = document.querySelector('#editCity');

        let firstName = this.props.user.firstName;
        let lastName = this.props.user.lastName;
        let email = this.props.user.email;
        let city = this.props.user.city;


        editFirstName.value = firstName
        editLastName.value = lastName;
        editEmail.value = email;
        editCity.value = city;

        this.setState({
            firstName,
            lastName,
            email,
            city,
        })
    }

    //Form handlers.
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
            
                <div className="inputField ">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" placeholder="First Name" id="editFirstName"  name="firstName" onChange={this.handleInputChange}/>
                </div>
                <span className="warning firstNameWarning"> </span>

                <div className="inputField lastNameField">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" placeholder="Last Name" id="editLastName"  name="lastName" onChange={this.handleInputChange}/>

                </div>
                <span className="warning lastNameWarning"> </span>

                <div className="inputField cityField">
                    <label htmlFor="city">Your City</label>
                    <input type="text" placeholder="Your City" id="editCity" name="city" onChange={this.handleInputChange}/>

                </div>
                <span className="warning cityWarning"> </span>

                <div className="inputField emailField">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" id="editEmail"  name="email" onChange={this.handleInputChange}/>
                </div>

                <span className="warning emailWarning"> </span>

                <input type="submit" placeholder="Sign Up!/"/>
            </form>
        )
    }
}

export default ProfileForm