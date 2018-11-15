import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'

class SignUp extends Component{
    constructor(){
        super()
        this.state ={
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
    }

    onFormSubmit(e){
        e.preventDefault();
        console.log(typeof this.state.profilePic)
        if(this.state.password1 !== this.state.password2){
            console.log('Passwords do not match');
        } else{
            axios.post(`${rootUrl}/user/signup`,
            {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            city: this.state.city,
            profilePic: this.state.profilePic,
            password: this.state.password1     
            }
        )
        .then((res)=>{
            console.log('submitted')
            console.log(res.data)
        })
        .catch((err)=>{
            console.log('denied')
            console.log(err)
        })
        }
        
        
    }

    handleFileUpload(e){
        e.preventDefault();
        const target = e.target;
        const file = target.files[0];
        console.log(file);
        this.setState({
            profilePic: file
        })
    }

    handleInputChange(e){
        e.preventDefault();
        console.log(e)
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <form encType="multipart/form-data"  className="signupForm" onSubmit={this.onFormSubmit}>
                <label htmlFor="profilePic">Upload a Profile Picture</label>
                <input type="file" required accept="image/*" required placeholder="Profile Pic" id="profilePic" name="profilePic" onChange={this.handleFileUpload}/>

                <input type="text" required placeholder="First Name" id="firstName" name="firstName" onChange={this.handleInputChange}/>
                <input type="text" required placeholder="Last Name" id="lastName" name="lastName" onChange={this.handleInputChange}/>
                <input type="email" required placeholder="Email" id="email" name="email" onChange={this.handleInputChange}/>
                <input type="text" required placeholder="Username" id="username" name="username" onChange={this.handleInputChange}/>
                <input type="password" required placeholder="Password" id="password1" name="password1" onChange={this.handleInputChange}/>
                <input type="password" required placeholder="Re-enter Password" id="password2" name="password2" onChange={this.handleInputChange}/>
                <input type="text" required placeholder="Your City" id="city" name="city" onChange={this.handleInputChange}/>
                <input type="submit" placeholder="Sign Up!/"/>
            </form>
        )
    }
}

export default SignUp