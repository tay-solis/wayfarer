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
                    <p className="author">By
                    <Link to={`../profile/${this.state.user.username}`}>
                        {this.state.user.username}
                    </Link></p>
                    <p className="postDate">{this.state.postedOn}</p>
                </div>
                }
                <p>{this.state.content}</p>
            </article>
        )
    }
}

export default Post
