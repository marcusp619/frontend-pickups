import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import './NewPickUpForm.css'
import NewPickUpMarker from '../NewPickUpMarker/NewPickUpMarker'

class NewPickUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sport: "",
      date: "",
      time: "",
      skill_level: "",
      location: "",
      latitude: "",
      longitude: ""
    }
  }

  static defaultProps = {
    center: { lat: 39.71, lng: -104.97 },
    zoom: 12
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleMapClick = (event) => {
    this.setState({
      latitude: event.lat,
      longitude: event.lng
    })
  }

  render() {
    const { sport, date, time, skill_level, location, latitude, longitude } = this.state
    const { loggedIn } = this.props
    // does this have to been a string template literal 
    //if its already a string in the .env file
    // const API_KEY = process.env.REACT_APP_MAPS_API_KEY
    const API_KEY = `${process.env.REACT_APP_MAPS_API_KEY}`

    return (
      <div>
        {loggedIn ?
          // div can be a fragment
          <div>
            <form className="new-pickup-form">
              <label>Pick Up Date</label>
              <input name="date" value={date} onChange={this.handleChange} />
              <label>Sport</label>
              <select name="sport" value={sport} onChange={this.handleChange}>
                <option selected="true" disabled="disabled">Choose Sport:</option>
                <option>Soccer</option>
                <option>Spikeball</option>
                <option>Basketball</option>
                <option>Kickball</option>
              </select>
              <label>Pick Up Time</label>
              <input name="time" value={time} onChange={this.handleChange} />
              <label>Skill Level</label>
              <select name="skill_level" value={skill_level} onChange={this.handleChange}>
                <option selected="true" disabled="disabled">Choose Skill Level:</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <label>Location (specific park, gym, etc.)</label>
              <input name="location" value={location} onChange={this.handleChange} />
              {sport ?
                <div>
                  <label>Please select the exact location on the map below:</label>
                  <div id="new-event-map">
                    <GoogleMap
                      onClick={this.handleMapClick}
                      bootstrapURLKeys={{ key: API_KEY }}
                      defaultCenter={this.props.center}
                      defaultZoom={this.props.zoom}
                      yesIWantToUseGoogleMapApiInternals

                    >
                      {latitude && longitude ?
                        <NewPickUpMarker lat={latitude} lng={longitude} sport={sport} /> :
                        null}
                    </GoogleMap>
                  </div>
                </div> :
                null}
            </form>
          </div> :
          <p>You must be logged in to access this content</p>}
      </div>
    )
  }
}

export default NewPickUpForm
