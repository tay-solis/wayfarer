import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'

class Profile extends Component{
    constructor(){
        super();
        this.state ={
            user: null
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
    }

    render(){
        return(
        <main className="profile">
            {!this.state.user && <p>Loading...</p>}
            {this.state.user &&
            <section className="profileHeader">
                <h1>{this.state.user.firstName} {this.state.user.lastName}</h1>
                <h2>Hometown: {this.state.user.city}</h2>
                <span>Joined: {this.state.user.joinDate.substr(0,10)}</span>
            </section> }
            {this.state.user && this.state.user.posts.length === 0 &&
                <section className="posts">
                <h1>This user doesn't have any posts!</h1>
                </section>
            }
        </main>
        )
    }
}

export default Profile