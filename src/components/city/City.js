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
            posts: null,
            postCount: 0
        }
        this.fetchData = this.fetchData.bind(this)
        this.updatePosts = this.updatePosts.bind(this)
        this.showPopUp = this.showPopUp.bind(this);
    }

    updatePosts(){
      let postCount = this.state.postCount++;
      this.fetchData();
      this.setState({
        postCount
      });
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
          let postCount = res.data.length;
          if(res.data.length > 0){
            let posts = <Posts posts={res.data}/>;
            this.setState({
                posts,
                postCount
            })
          }

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
        postCount: 0
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
                  <div className="cityTitle">
                    <h1>{this.state.city.name}</h1>
                    <h2>{this.state.city.country}</h2>
                    <p>{this.state.postCount} post(s)</p>
                  </div>
                  <div className="cityImg">
                    <div className="cityImgContainer">
                      <img src={`${rootUrl}/${this.state.city.photo}`}/>
                    </div>
                    <button className="addPost" onClick={this.showPopUp}>Got a Travel Tip?</button>
                  </div>



                </header>

            }

            <div className="popUp addPostPopUp" style={{display:'none'}}>
            <div className="popUpClose" onClick={this.showPopUp}><i className="far fa-window-close"></i></div>
              <PostForm {...this.props} currentUser={this.props.currentUser}
                updatePosts={this.updatePosts} 
                showPopUp={this.showPopUp} 
                setCurrentCity={this.props.setCurrentCity}/>
            </div>
            {this.state.posts}
        </main>
        )
    }
}

export default City
