import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeather, getLocation } from '../actions/index';
import Searchbar from '../containers/Searchbar'
import WeatherView from '../containers/WeatherView'
import WeatherList from '../containers/WeatherList'
import Loading from '../containers/Loading'
import './App.css';

import {weekofDay} from '../components/Functions';
import dummyapi from '../sagas/dummyapi'

const cities =  dummyapi.cities 
const citties_arr = Object.values(cities)
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          coords: citties_arr.find((cities) => (cities.city === this.props.match.params.location)),
          error: '',
          term: ''
        };
    }

  componentWillMount()  {
        this.props.getWeather(this.state.coords);
        if (!window.navigator.onLine) {
            console.log(localStorage.getItem('weather'))
        }
  }

  // Renders the functional components to display the data
  renderForecastedWeather = () => {
    if (this.props.weather && this.state.coords!==null) {
      const data = this.props.weather.daily.data.slice(0, 7);
      const mapdays = data.map((x,index) => ({id: index, time: x.time, day: weekofDay(x.time)}))
      let dayno = mapdays.find(x => (x.day === this.props.match.params.day))
      const city = this.props.match.params.location;
      return (
        <div>
			<Loading />
            <WeatherView selectedday={data[dayno.id]} city={city} day={this.props.match.params.day} />
            <WeatherList forcastdays={data} city={city} day={this.props.match.params.day} />
        </div>
        );
    }
  }
  render() {
    if (this.state.error !== '') {
          return (
            <div className="error">
              <h3>{this.state.error}</h3>
            </div>
          );
      } else {
            return (
            <div className="forecast">
              <Searchbar city={this.props.match.params.location}/>
              {this.renderForecastedWeather()}
            </div>       
            );
      }
  }
};


function mapStateToProps(state) {
  return {
    weather: state.weather,
    location: state.location,
  };
}

const mapDispatchToProps = {
  getWeather: getWeather,
  getLocation: getLocation,
};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App;

