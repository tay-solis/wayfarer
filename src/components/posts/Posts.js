import React, {Component} from 'react'
import Post from './Post'

class Posts extends Component{
    constructor(){
        super();
        this.state = {
            posts: [],
        }
    }

    componentDidMount(){
        let posts = [];
        for(let i = 0; i < this.props.posts.length; i++){
            posts.push(<Post key={i} id={this.props.posts[i]._id} title={this.props.posts[i].title} content={this.props.posts[i].content} postedOn={this.props.posts[i].postedOn} user={this.props.posts[i].user}/>)
        }
        this.setState({
            posts
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