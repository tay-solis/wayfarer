import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios';

class PostForm extends Component{
    constructor(props){
        super(props)
        //sets the initial state via the constructor! that's the constructor's job :)
        this.state = {
          title: ' ',
          content: ' ',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
      }
    
    componentDidMount(){
        
    }
    
    onFormSubmit(e){
        e.preventDefault();

        let newPost  ={
            title: this.state.title,
            content: this.state.content,
            postedOn: Date.now(),
            user: this.props.currentUser
        }
        console.log(newPost)
        axios.post(`${rootUrl}/posts/create`, newPost)
            .then((res)=>{
                console.log(res)
            })
    }
      
    
    handleInputChange(e){
        e.preventDefault();
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        

    }
    
      
    render(){
        return(
            <form className="postForm" onSubmit={ this.onFormSubmit }>
                <label htmlFor='title'>Title</label>
                <input placeholder='Title' type='text' id="title" name="title"  onChange={this.handleInputChange}/>
                <label htmlFor='content'>Share Your Thoughts!</label>
                <textarea id="content" name="content" onChange={this.handleInputChange}></textarea>
                <button type='submit'>Create Post</button>
            </form>
        )
    }
}

export default PostForm;