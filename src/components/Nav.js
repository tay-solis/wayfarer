import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {rootUrl} from '../config/constants'

class Nav extends Component{
    render(){
        return(
            <nav>
                <Link to={'/'}><h1>Wayfarer</h1></Link>          
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
                        <li><Link to={`/addpost`}>Add a Post</Link></li> 
                        <li><span onClick={this.props.handleLogout} to="/">Logout</span></li>                 
                    </ul>
                    :
                    <ul>
                        <li><Link to={'/signup'}>Sign Up</Link></li>                
                        <li><Link to={'/login'}>Log In</Link></li>
                    </ul>
                         
                }           
            </nav>
        )
    }
}

export default Nav;