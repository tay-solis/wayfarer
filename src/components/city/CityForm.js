import React, {Component} from 'react'
import {rootUrl} from '../../config/constants'
import axios from 'axios'

class CityForm extends Component{
    constructor(){
        super()
        this.state ={
            name: '',
            photo: '#'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    onFormSubmit(e){
        e.preventDefault();
        console.log(typeof this.state.photo)
        if(this.state.password1 !== this.state.password2){
            console.log('Passwords do not match');
        } else{
            let newCity = new FormData();
            newCity.append('name', this.state.name);
            newCity.append('country', this.state.country);
            newCity.append('photo', this.state.photo);
            
            axios({
                method: 'POST',
                url: `${rootUrl}/city/create`,
                data: newCity,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
        .then((res)=>{
            console.log('submitted')
            console.log(res.data)
            this.props.history.push(`../cities`);

        })
        .catch((err)=>{
            console.log('denied')
            console.log(err)
        })
        }
        
        
    }

    handleFileUpload(e){
        e.preventDefault();
        const target = e.target;
        const file = target.files[0];
        console.log(file);
        this.setState({
            photo: file
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
            <form  encType="multipart/form-data"  id="cityForm" onSubmit={this.onFormSubmit}>
                <label htmlFor="photo">Upload a Photo</label>
                <input type="file" accept="image/*" required placeholder="Photo" id="photo" name="photo" onChange={this.handleFileUpload}/>
                <input type="text" required placeholder="New City" id="name" name="name" onChange={this.handleInputChange}/>
                <input type="text" required placeholder="Country" id="country" name="country" onChange={this.handleInputChange}/>
                <input type="submit" placeholder="Travel!/"/>
            </form>
        )
    }
}

export default CityForm