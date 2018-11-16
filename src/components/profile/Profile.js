import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'
import Posts from '../posts/Posts'

class Profile extends Component{
    constructor(){
        super();
        this.state ={
            user: null,
            posts: []
        }
    }

    componentDidMount(){
        let username = this.props.username ? this.props.username : this.props.match.params.username;
        axios.get(`${rootUrl}/user/${username}`)
        .then((res)=>{
            this.setState({
                user: res.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
        axios.get(`${rootUrl}/posts/author/${username}`)
        .then((res)=>{
            this.setState({
                posts: res.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render(){
        return(
        <main className="profile">
            {!this.state.user && <p>Loading...</p>}
            {this.state.user &&
            <section className="profileHeader">
                <img className="profilePicture" alt={`Profile Picture for ${this.state.user.username}`} src={`${rootUrl}/${this.state.user.profilePic}`}/> 
                <h1>{this.state.user.firstName} {this.state.user.lastName}</h1>
                <h2>Hometown: {this.state.user.city}</h2>
                <span>Joined: {this.state.user.joinDate.substr(0,10)}</span>
            </section> }
            {this.state.posts && this.state.posts.length > 0 &&
                <Posts posts={this.state.posts}/>
            }
        </main>
        )
    }
}

export default Profile