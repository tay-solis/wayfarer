import React, {Component} from 'react'

class Post extends Component{
    render(){
        return(
            <article>
                <h2>{this.props.title}</h2>
                <p className="author">By {this.props.user.username}</p>
                <p className="postDate">{this.props.postedOn}</p>
                <p>{this.props.content}</p>
            </article>
        )
    }
}

export default Post