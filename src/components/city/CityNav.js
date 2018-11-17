import React, {Component} from 'react'
import CityLink from './CityLink'
import {rootUrl} from '../../config/constants'

class CityNav extends Component{
    constructor(){
        super();
        this.state={
            cityLinks: []
        }
    }

    componentDidMount(){
        let cityLinks = [];
        console.log('cities' + this.props.cities)
        for (let i = 0; i < this.props.cities.length; i++){
            cityLinks.push(<CityLink key={i} 
                name={this.props.cities[i].name} 
                photo={`${rootUrl}/${this.props.cities[i].photo}`}
                setCurrentCity={this.props.setCurrentCity}/>)
        }
        this.setState({
            cityLinks
        })
    }

    render(){
        return(
            <aside className="cityNav">
            <h1>Cities</h1>
                {this.state.cityLinks}
            </aside>
        )
    }
}
export default CityNav