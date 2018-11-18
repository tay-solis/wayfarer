import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';



class Login extends Component{
    constructor(){
        super()
        this.state ={
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e){
        e.preventDefault();
        axios.post(`${rootUrl}/user/login`, {username: this.state.username, password: this.state.password})
        .then((res)=>{
            console.log(res.data)
            const { token } = res.data;
            // Save to LocalStorage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth Header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            this.props.showPopUp();
            this.props.setCurrentUser(decoded);
            this.props.history.push(`/profile/${this.state.username}`);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleInputChange(e){
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });


    }

    render(){
        return(
            <form className="LoginForm" onSubmit={this.onFormSubmit}>
                <div className="inputField">
                    <label htmlFor="username">username</label>
                    <input required type="text" required placeholder="Username" id="username" name="username" onChange={this.handleInputChange}/>
                </div>
                <div className="inputField">
                    <label htmlFor="password">password</label>
                    <input required type="password" required placeholder="Password" id="password" name="password" onChange={this.handleInputChange}/>
                </div>
                <input id="submit" type="submit" placeholder="Sign Up!/"/>
            </form>
        )
    }
}

export default Login
