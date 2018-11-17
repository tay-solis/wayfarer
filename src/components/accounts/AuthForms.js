import React, {Component} from 'react'
import Login from './Login'
import {Link} from 'react-router-dom'

class AuthForms extends Component{
    render(){
        return(
            <div className="authForms">
                <Login {...this.props} setCurrentUser={this.props.setCurrentUser} />
                Need an account? <Link to={'/signup'}>Sign Up!</Link>
            </div>
        )
    }
}
export default AuthForms