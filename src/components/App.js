import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeather, getLocation, selectDay } from '../actions/index';
import Searchbar from '../containers/Searchbar'
import WeatherView from '../containers/WeatherView'
import WeatherList from '../containers/WeatherList'
import Loading from '../containers/Loading'
import '../App.css';

import {weekofDay} from '../components/Functions';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: '',
          term: ''
        };
    }

  componentWillMount()  {
        this.props.getWeather(this.props.match.params.location);
        this.props.selectDay(this.props.match.params.day);
  }

  // Renders the functional components to display the data
  renderForecastedWeather = () => {
    if (this.props.weather && this.props.location) {
      const data = this.props.weather.daily.data.slice(0, 7);
      const mapdays = data.map((x,index) => ({id: index, time: x.time, day: weekofDay(x.time)}))
      let dayno = mapdays.find(x => (x.day === this.props.match.params.day))
      const { city, country, latitude, longtidue } = this.props.location;
      return (
        <div>
			<Loading />
            <WeatherView selectedday={data[dayno.id]} city={city} country={country} latitude={latitude} longtidue={longtidue} day={this.props.match.params.day} />
            <WeatherList forcastdays={data} city={city} country={country}  vlatitude={latitude} longtidue={longtidue} day={this.props.match.params.day} />
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
    day: state.day,
  };
}

const mapDispatchToProps = {
  getWeather: getWeather,
  getLocation: getLocation,
  selectDay: selectDay,
};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default App;

