import React, {Component} from 'react'
import {rootUrl} from '../config/constants'
import axios from 'axios'

import City from '../components/city/City'
import CityNav from '../components/city/CityNav'


class CitiesContainer extends Component{
    constructor(){
        super();
        this.state= {
            cities: [],
            currentCity: '',
            cityNav: null,
        }
        this.setCurrentCity = this.setCurrentCity.bind(this)
    }

    componentDidMount(){
        axios.get(`${rootUrl}/city/all`)
        .then((res)=>{
            let currentCity = '';
            let cities =[];
            for(let i = 0; i < res.data.length; i++){
                if (i === 0) currentCity = res.data[0].name;
                cities.push(res.data[i])
            }

            let cityNav = <CityNav cities={cities} setCurrentCity={this.setCurrentCity} isValidName={this.props.isValidName}/>
            console.log()
            this.setState({
                cities,
                currentCity,
                cityNav
            })
        })
    }

    setCurrentCity(name){
        this.setState({
            currentCity: name
        })
    }

    render(){
        return(
            <div className="citiesContainer">
                {this.state.cityNav}
                <section className="currentCity">
                    {this.state.currentCity
                    &&
                    <City {...this.props} name={this.state.currentCity} currentUser={this.props.currentUser}/>
                    }
                </section>

                {!this.state.cities
                &&
                <p>Loading...</p>}

            </div>
        )
    }
}

export default CitiesContainer
