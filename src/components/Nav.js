import React, {Component} from 'react'
import {Link} from 'react-router-dom';

class Nav extends Component{
    render(){
        return(
            <nav>
                <Link to={'/'}><h1>Wayfarer</h1></Link>          
                {
                    this.props.isAuthed
                    ?
                    <ul>
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