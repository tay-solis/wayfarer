import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {rootUrl} from '../config/constants'
import axios from 'axios'

class Nav extends Component{
  showPopUp =()=>{
    this.props.showPopUp();
  }
    render(){
        return(
            <nav>
                <div className="navTitle">
                    <img className="logo" src={require("../images/brochure.png")}/>
                    <Link to={'/'}><h1>Wayfarer</h1></Link>
                </div>

                {
                    this.props.isAuthed
                    ?
                    <ul>
                        <li>
                            <div className="navIconContainer">
                                <img className="navIcon" alt={`user icon for ${this.props.currentUser.username}`} src={`${rootUrl}/${this.props.currentUser.profilePic}`}/>
                            </div>
                            Hello, {this.props.currentUser.firstName}!
                        </li>
                        <li><Link to={`/profile/${this.props.currentUser.username}`}>My Profile</Link></li>
                        <li><Link to={`/cities`}>Explore</Link></li>
                        <li><span onClick={this.props.handleLogout} to="/">Logout</span></li>
                    </ul>

                    :
                    <ul>
                        <li><span onClick={this.showPopUp}>Login/Register</span></li>
                    </ul>

                }
            </nav>
        )
    }
}

export default Nav;
