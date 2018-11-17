import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'
import Posts from '../posts/Posts'
import PostForm from '../posts/PostForm'

class City extends Component{
    constructor(){
        super();
        this.state ={
            city: null,
            posts: [],
            headerStyle: {}
        }
        this.fetchData = this.fetchData.bind(this)
    }

    fetchData(){
        let city = this.props.name;
        console.log(`current City: ${city}`)
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

    componentDidMount(){
        this.fetchData();

    }

    componentWillReceiveProps(){
      this.setState({
        city: null,
        posts: [],
      })
      this.fetchData();
    }

    showPopUp(){
      let popUp = document.querySelector('.addPostPopUp');
      if(popUp.style.display === 'none'){
        popUp.style.display = "block";
      } else {
        popUp.style.display = "none";

      }
    }

    render(){
        return(
        <main className="City">
            {!this.state.city && <p>Loading...</p>}
            {this.state.city &&
                <header>
                    <img src={`${rootUrl}/${this.state.city.photo}`}/>
                    <h1>{this.state.city.name}</h1>
                    <button className="addPost" onClick={this.showPopUp}>Got a Travel Tip?</button>
                </header>
            }
            <div className="popUp addPostPopUp">
              <div className="popUpClose" onClick={this.showPopUp}><i className="far fa-window-close"></i></div>
              <PostForm {...this.props} currentUser={this.props.currentUser} showPopUp={this.showPopUp}/>
            </div>
            {this.state.posts && this.state.posts.length > 0 &&
                <Posts posts={this.state.posts}/>
            }
        </main>
        )
    }
}

export default City
