import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home'
import SignUp from '../components/accounts/SignUp'
import Login from '../components/accounts/Login'


export default (
    <Switch>  
        <Route path="/signup" component={ SignUp }/> 
        <Route path="/login" component={ Login }/> 
        <Route path="/" component={ Home }/>   
    </Switch>
)