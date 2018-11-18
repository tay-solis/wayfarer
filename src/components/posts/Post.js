import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {rootUrl} from '../../config/constants'

class Post extends Component{
    constructor(){
        super()
        this.state ={
            title: '',
            content: '',
            postedOn: null,
            user: null
        }
        this.timeAgo = this.timeAgo.bind(this);
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
                    user: res.data.user
                })
            })
        } else{
            this.setState({
                title: this.props.title,
                city: this.props.city,
                content: this.props.content,
                postedOn: this.props.postedOn,
                user: this.props.user
            })
        }
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
                      <Link
                          to={`../post/${this.props.id}`}>
                          <h2>{this.state.title}</h2>
                      </Link>
                  }
                  {!this.props.id &&
                  <h2>{this.state.title}</h2>
                  }
                  {this.state.user &&
                  <div className="subtitle">
                      <h3>{this.state.city.name}</h3>
                      <p className="author">By <Link to={`../profile/${this.state.user.username}`}>{this.state.user.username}</Link></p>
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
