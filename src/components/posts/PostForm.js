import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios';
import {Link} from 'react-router-dom'

class PostForm extends Component{
    constructor(props){
        super(props)
        //sets the initial state via the constructor! that's the constructor's job :)
        this.state = {
          title: ' ',
          content: ' ',
          city: '',
          cities: null,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
      }
    
    componentDidMount(){
        axios.get(`${rootUrl}/city/all`)
        .then((res)=>{
            let cities =[]
            for(let i = 0; i < res.data.length; i++){
                cities.push(<option key={i} value ={res.data[i].name}>{res.data[i].name}</option>)
            }
            this.setState({
                cities
            })
        })
    }
    
    onFormSubmit(e){
        e.preventDefault();

        let newPost  ={
            title: this.state.title,
            content: this.state.content,
            postedOn: Date.now(),
            city: this.state.city,
            user: this.props.currentUser
        }
        console.log(newPost)
        axios.post(`${rootUrl}/posts/create`, newPost)
            .then((res)=>{
                console.log(res)
                this.props.history.push(`/`);

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
            {this.state.cities && this.state.cities.length > 0 
            &&
            <div className="citySelection">
                <select name="city" onChange={this.handleInputChange}>
                    {this.state.cities}
                </select>
                Don't see your city? <Link to='/addcity'>Add it here!</Link>
            </div>
                
            }
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