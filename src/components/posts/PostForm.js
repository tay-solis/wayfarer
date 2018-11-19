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
          user: null,
          editing: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
      }
    componentDidMount(){

        axios.get(`${rootUrl}/city/all`)
        .then((res)=>{
            let city = "";
            let cities =[]
            for(let i = 0; i < res.data.length; i++){
                if(i === 0) city = res.data[i].name;
                cities.push(<option key={i} id={res.data[i].name} value ={res.data[i].name}>{res.data[i].name}</option>)
            }
            this.setState({
                cities,
                city,
                editing: false
            })
            if(this.props.post){
                let editTitle = document.getElementById('title');
                let editContent = document.getElementById('content');
                let citySelect = document.getElementById('citySelect')
                let selectedCity = document.getElementById(`${this.props.post.city.name}`)
                editTitle.value = this.props.post.title;
                editContent.value = this.props.post.content;
                citySelect.value = this.props.post.city;
                selectedCity.setAttribute('selected', true);
                this.setState({
                    title: this.props.post.title,
                    content: this.props.post.content,
                    city: this.props.post.city,
                    editing: true
                })
            }
        })
    }


    onFormSubmit(e){
        e.preventDefault();
        let newPost  ={
            title: this.state.title,
            content: this.state.content,
            city: this.state.city,
            // user: this.props.currentUser
        }
        if(this.state.editing){
            console.log(newPost);
            axios.put(`${rootUrl}/posts/edit/${this.props.post._id}`, newPost)
            .then((res)=>{
                console.log('updated');
                this.props.showPopUp();
                this.setState({editing: false})
               this.props.history.push(`../profile/${this.props.currentUser.username}`) 
            })
        } else{
            newPost.postedOn = Number(Date.now());
            newPost.user = this.props.currentUser;
          axios.post(`${rootUrl}/posts/create`, newPost)
              .then((res)=>{
                  console.log('posted');
                  console.log(res)
                    this.showPopUp();
                  this.updatePosts();
                  this.setCurrentCity(this.state.city)
              })
        }

    }

    setCurrentCity(name){
        this.props.setCurrentCity(this.state.city);
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
                <select id="citySelect" name="city" onChange={this.handleInputChange}>
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
                {this.state.editing
                ?
                <button type='submit'>Edit this Post</button>
                :
                <button type='submit'>Create Post</button>
              }

            </form>
        )
    }
}

export default PostForm;
