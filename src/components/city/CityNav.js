import React, {Component} from 'react'
import CityLink from './CityLink'
import CityForm from './CityForm'
import {rootUrl} from '../../config/constants'

class CityNav extends Component{
    constructor(){
        super();
        this.state={
            cityLinks: []
        }
        this.showPopUp = this.showPopUp.bind(this);
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
showPopUp(){
  let popUp = document.querySelector('.addCityPopUp');
  if(popUp.style.display === 'none'){
    popUp.style.display = "block";
  } else {
    popUp.style.display = "none";

  }
}

    render(){
        return(
            <aside className="cityNav">
            <div  className="popUp addCityPopUp" style={{display:'none'}}>
              <div className="popUpClose" onClick={this.showPopUp}><i className="far fa-window-close"></i></div>
              <CityForm isValidName={this.props.isValidName}/>
            </div>
            <button onClick={this.showPopUp} className="addCity">Been Somewhere New?</button>
                {this.state.cityLinks}
            </aside>
        )
    }
}
export default CityNav
