import React, {
    Component
} from 'react'
import {
    rootUrl
} from '../../config/constants'
import axios from 'axios'

class ProfilePicForm extends Component {
    constructor() {
        super()
        this.state = {
            profilePic: '#'
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }



    onFormSubmit(e) {
        e.preventDefault();
        let updatedProfile = new FormData();
        updatedProfile.append('profilePic', this.state.profilePic);
        console.log("updated user")
            console.log(updatedProfile)
            axios({
                    method: 'PUT',
                    url: `${rootUrl}/user/editprofilepic/${this.props.currentUser.username}`,
                    data: updatedProfile,
                    config: {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                })
                .then((res) => {
                this.props.showEditProfilePic();
                this.props.history.push(`../profile/${this.props.currentUser.username}`) 
                })
                .catch((err) => {
                    console.log(err);
                })
    }

    handleFileUpload(e) {
        const target = e.target;
        const file = target.files[0];
        console.log(file);
        this.setState({
            profilePic: file
        })
    }

    render() {
        return (
            <form  encType="multipart/form-data"  id="profilePicForm" onSubmit={this.onFormSubmit}>
            
            <label htmlFor="profilePic">Upload a Profile Picture</label>
                        <input type="file" accept="image/*" required placeholder="Profile Pic" id="editProfilePic" name="profilePic" onChange={this.handleFileUpload}/>
                <input type="submit" placeholder="Sign Up!/"/>
            </form>
        )
    }
}

export default ProfilePicForm
