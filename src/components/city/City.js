import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'
import Posts from '../posts/Posts'

class City extends Component{
    constructor(){
        super();
        this.state ={
            city: null,
            posts: [],
            headerStyle: {}
        }
    }

    componentDidMount(){
        let city = this.props.match.params.name;
        axios.get(`${rootUrl}/city/${city}`)
        .then((res)=>{
            console.log('retrieved')
            this.setState({
                city: res.data
            })
        })
        .catch((err)=>{
            console.log(err);
        })
        axios.get(`${rootUrl}/posts/from/${city}`)
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
        <main className="City">
            {!this.state.city && <p>Loading...</p>}
            {this.state.city &&
                <header>
                    <img src={`${rootUrl}/${this.state.city.photo}`}/>
                    <h1>{this.state.city.name}</h1>
                </header>
            }
            {this.state.posts && this.state.posts.length > 0 &&
                <Posts posts={this.state.posts}/>
            }
        </main>
        )
    }
}

export default City