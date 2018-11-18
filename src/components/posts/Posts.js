import React, {Component} from 'react'
import Post from './Post'

class Posts extends Component{
    constructor(){
        super();
        this.state = {
            posts: [],
            numberOfPosts: 0
        }
    }


    componentDidMount(){
        let posts = [];
        for(let i = 0; i < this.props.posts.length; i++){
            posts.push(<Post key={i} id={this.props.posts[i]._id} title={this.props.posts[i].title}
              city={this.props.posts[i].city} content={this.props.posts[i].content} postedOn={this.props.posts[i].postedOn} user={this.props.posts[i].user}/>)
        }
        posts.reverse();
        let numberOfPosts = this.state.posts.length;
        this.setState({
            posts,
            numberOfPosts
        })
    }

    render(){
        return(
            <section className="posts">
                {this.state.posts}
            </section>
        )
    }
}

export default Posts
