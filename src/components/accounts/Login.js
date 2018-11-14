import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'



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