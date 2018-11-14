import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home'
import SignUp from '../components/accounts/SignUp'


export default (
    <Switch>  
        <Route path="/signup" component={ SignUp }/> 
        <Route path="/" component={ Home }/>   
    </Switch>
)