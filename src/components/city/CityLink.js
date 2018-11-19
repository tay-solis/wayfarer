import React, {Component} from 'react'

class CityLink extends Component {
    constructor() {
        super()
        this.setCurrentCity = this.setCurrentCity.bind(this)
    }

    setCurrentCity() {
        console.log('clicked on ' + this.props.name)
        this.props.setCurrentCity(this.props.name);
    }
    render() {
        return (
            <div className="cityLink" id={this.props.name} onClick={this.setCurrentCity}>
              <div className="cityLinkImg">
                <img src={this.props.photo} onClick={this.setCurrentCity}/>
              </div>

                <h2 onClick={this.setCurrentCity}>{this.props.name} </h2>
            </div>
        )
    }
}

export default CityLink