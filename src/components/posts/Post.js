import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {rootUrl} from '../../config/constants'
import PostForm from './PostForm'

class Post extends Component{
    constructor(){
        super()
        this.state ={
            title: '',
            content: '',
            postedOn: null,
            user: null,
            id: null,
        }
        this.timeAgo = this.timeAgo.bind(this);
        this.showEditPopUp = this.showEditPopUp.bind(this);
        this.showDeletePopUp = this.showDeletePopUp.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }


        /*
Takes in a past date and converts it to a string:
if < 24 hours ago, returns x hours ago
if > 24 hours but < 2 days, returns 1 day ago
if >2 days returns x days ago
*/
timeAgo(past){
    let today = Date.now();
    let time = Math.floor((today - past)/(1000* 60 * 60));
    if (time < 1){
      time = Math.floor((today - past)/(1000* 60));
      return `${time} minutes ago`;
    }
    if (time < 24){
      return`${time} hours ago`;
    } else{
      time = Math.floor(time/24);
      if (time === 1) {
        return `${time} day ago`;
      }else{
        return `${time} days ago`;
      }
    }
  }

    componentDidMount(){

        if (this.props.match){
            console.log(`${rootUrl}/posts/post/${this.props.match.params.id}`)
            axios.get(`${rootUrl}/posts/post/${this.props.match.params.id}`)
            .then((res)=>{
                console.log(res.data)
                this.setState({
                    title: res.data.title,
                    city: res.data.city,
                    content: res.data.content,
                    postedOn: res.data.postedOn,
                    user: res.data.user,
                    _id: res.data._id
                })
            })
        } else{
            this.setState({
                title: this.props.title,
                city: this.props.city,
                content: this.props.content,
                postedOn: this.props.postedOn,
                user: this.props.user,
                _id: this.props._id
            })
        }
    }

    showEditPopUp(){
      let popUp = document.querySelector('.editForm');
      if(popUp.style.display === 'none'){
        popUp.style.display = "block";
      } else {
        popUp.style.display = "none";

      }
    }
    showDeletePopUp(){
      let popUp = document.querySelector('.deletePopUp');
      if(popUp.style.display === 'none'){
        popUp.style.display = "block";
      } else {
        popUp.style.display = "none";

      }
    }

    deletePost(){
      console.log('id' + this.state._id)
      axios.delete(`${rootUrl}/posts/delete/${this.state._id}`)
      .then((res)=>{
        console.log(res.data);
        this.props.history.push(`/profile/${this.props.currentUser.username}`);
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    render(){
        return(
            <article>
              {this.state.user &&
                <div className="postImgContainer">
                  <img id="postImg" src={`${rootUrl}/${this.state.user.profilePic}`}/>
                </div>

                }
              <div className="post">
                <p className="postDate">{this.timeAgo(this.state.postedOn)}</p>
                  {this.props.id &&
                      <h2 className="postTitle"><Link
                          to={`../post/${this.props.id}`}>

                          {this.state.title}
                      </Link></h2>
                  }
                  {!this.props.id &&
                  <h2 className="postTitle">{this.state.title}</h2>
                  }
                  {this.state.user &&
                  <div className="subtitle">
                      <h3>{this.state.city.name}</h3>
                      <p className="author">By <Link to={`../profile/${this.state.user.username}`}>{this.state.user.username}</Link></p>
                  </div>
                  }
                  {this.state.user && this.props.currentUser && this.props.currentUser.username === this.state.user.username
                &&
                    <div className="postEditContainer">
                        <div className="editForm popUp" style={{display:'none'}}>
                            <PostForm {...this.props} 
                            showPopUp={this.showEditPopUp} 
                            currentUser={this.props.currentUser} 
                            updatePosts={this.updatePosts} 
                            post={this.state}/>
                        </div>
                        <div className = "postBtns">
                            <button onClick={this.showEditPopUp} className="editBtn">Edit this Post</button>
                            <button onClick={this.showDeletePopUp} className="deleteBtn">Delete this Post</button>
                        </div>
                        <div className = "popUp deletePopUp" style={{display:'none'}}>
                            <p>Are you sure you want to delete <em>{this.state.title}</em>?</p>
                            <button onClick={this.deletePost} className="deleteBtn">Yes</button><button onClick={this.showDeletePopUp} className="closeDelete">No</button>
                        </div>
                    </div>
                }
                  {this.state.content.length > 1000
                    && this.props.id&&
                    <p className="postContent">{this.state.content.substring(0,999)}...
                      <br/>
                      <Link
                          to={`../post/${this.props.id}`}>
                          <button className="readMore">Read More</button>
                      </Link></p>

                  }

                  {this.state.content.length < 1000 &&
                    <p className="postContent">{this.state.content}</p>
                  }
                  {!this.props.id && this.state.content.length > 1000 &&
                  <p className="postContent">{this.state.content}</p>}

              </div>

            </article>
        )
    }
}

export default Post
