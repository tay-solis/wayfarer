import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'
import Posts from '../posts/Posts'
import ProfileForm from './ProfileForm'
import ProfilePicForm from './ProfilePicForm'

class Profile extends Component{
    constructor(){
        super();
        this.state ={
            user: null,
            posts: []
        }
        this.showEditProfile = this.showEditProfile.bind(this);
        this.showEditProfilePic = this.showEditProfilePic.bind(this);
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

    showEditProfile(){
        let popUp = document.querySelector('.editProfile');
      if(popUp.style.display === 'none'){
        popUp.style.display = "block";
      } else {
        popUp.style.display = "none";

      }
    }
    showEditProfilePic(){
        let popUp = document.querySelector('.editProfilePic');
      if(popUp.style.display === 'none'){
        popUp.style.display = "block";
      } else {
        popUp.style.display = "none";

      }
    }

    render(){
        return(
        <main className="profile navRoom">
            {!this.state.user && <p>Loading...</p>}
            {this.state.user &&
            <section className="profileHeader">
              <div className="profilePicContainer">
                <img className="profilePic" alt={`Profile Picture for ${this.state.user.username}`} src={`${rootUrl}/${this.state.user.profilePic}`}/>
              </div>

                <div className="profileInfo">
                  <h1>{this.state.user.firstName} {this.state.user.lastName}</h1>
                  <h2>Hometown: {this.state.user.city}</h2>
                  <span>Joined: {this.state.user.joinDate.substr(0,10)}</span>
                  {this.state.user && this.props.currentUser && this.props.currentUser.username === this.state.user.username
                &&
                <div className="editProfileContainer">
                    <div className="editProfilePic popUp" style={{display:'none'}}>
                    <div className="popUpClose" onClick={this.showEditProfilePic}><i className="far fa-window-close"></i></div>
                        <ProfilePicForm {...this.props} 
                        showEditProfilePic={this.showEditProfilePic}
                        user={this.state.user}
                        currentUser={this.props.currentUser} 
                        /> 
                    </div>
                    <div className="editProfile popUp" style={{display:'none'}}>
                    <div className="popUpClose" onClick={this.showEditProfile}><i className="far fa-window-close"></i></div>
                        <ProfileForm 
                        {...this.props} 
                        user={this.state.user} 
                        showEditProfile={this.showEditProfile}
                        currentUser={this.props.currentUser} 
                        isValidName={this.props.isValidName} 
                        isOnlyLettersOrNumbers={this.props.isOnlyLettersOrNumbers} 
                        isValidEmail={this.props.isValidEmail}/>
                    </div>
                    <div className="postBtns">
                    <button className="editProfilePicBtn" onClick={this.showEditProfilePic}>Update My Profile Pic</button>
                    <button className="editProfileBtn" onClick={this.showEditProfile}>Edit My Profile</button>
                    </div>
                    

                </div>}
                </div>
                

            </section> }
            {this.state.posts && this.state.posts.length > 0 &&
                <Posts posts={this.state.posts}/>
            }
            {this.state.user && this.state.posts && this.state.posts.length === 0 &&
            <h1>{this.state.user.firstName} has no posts  ¯\_(ツ)_/¯</h1>}
        </main>
        )
    }
}

export default Profile
