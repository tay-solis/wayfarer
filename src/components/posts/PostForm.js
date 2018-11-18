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
          user: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.updatePosts = this.updatePosts;
      }

      updatePosts(){
        this.props.updatePosts();
      }
    componentDidMount(){
        axios.get(`${rootUrl}/city/all`)
        .then((res)=>{
            let city = "";
            let cities =[]
            for(let i = 0; i < res.data.length; i++){
                if(i === 0) city = res.data[i].name;
                cities.push(<option key={i} value ={res.data[i].name}>{res.data[i].name}</option>)
            }
            this.setState({
                cities,
                city
            })
        })
    }

    onFormSubmit(e){
        e.preventDefault();
        console.log(Number(Date.now()))
        let newPost  ={
            title: this.state.title,
            content: this.state.content,
            postedOn: Number(Date.now()),
            city: this.state.city,
            user: this.props.currentUser
        }
        console.log(newPost)
        axios.post(`${rootUrl}/posts/create`, newPost)
            .then((res)=>{
                console.log(res);
                this.props.showPopUp();
                this.updatePosts();
            })
    }

    updateTopPost(){
        this.props.updateTopPost();
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
                <p>Don't see your city? <span className='addCityLink'>Add it here!</span></p>

            </div>

            }
            <div className = "inputField">
              <label htmlFor='title'>Title</label>
              <input placeholder='Title' type='text' id="title" name="title"  onChange={this.handleInputChange}/>
            </div>

                <label htmlFor='content'>Share Your Thoughts!</label>
                <textarea id="content" name="content" onChange={this.handleInputChange}></textarea>
                <button type='submit'>Create Post</button>
            </form>
        )
    }
}

export default PostForm;
