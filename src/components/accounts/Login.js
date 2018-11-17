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
                <input required type="text" required placeholder="Username" id="username" name="username" onChange={this.handleInputChange}/>
                <input required type="password" required placeholder="Password" id="password" name="password" onChange={this.handleInputChange}/>
                <input type="submit" placeholder="Sign Up!/"/>
            </form>
        )
    }
}

export default Login