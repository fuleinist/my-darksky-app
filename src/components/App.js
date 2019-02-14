import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeather, getLocation } from '../actions/index';
import logo from '../logo.svg';
import Searchbar from '../containers/Searchbar'
import WeatherView from '../containers/WeatherView'
import WeatherList from '../containers/WeatherList'
import Loading from '../containers/Loading'
import '../App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: '',
          term: ''
        };
    }

  componentWillMount() {
        this.props.getWeather(this.props.match.params.location);
        this.props.getLocation(this.props.match.params.location);
  }

  // Renders the functional components to display the data
  renderForecastedWeather = () => {
    if (this.props.weather && this.props.location) {
      const data = this.props.weather.daily.data.slice(0, 7);
      const { city, country, latitude, longtidue } = (this.props.location)[0];
      return (
        <div>
            <WeatherView selectedday={data[0]} city={city + ', ' + country} latitude={latitude} longtidue={longtidue} day={this.props.match.params.day} />
            <WeatherList forcastdays={data} city={city + ', ' + country} latitude={latitude} longtidue={longtidue} day={this.props.match.params.day} />
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
      } else if (!this.props.weather /*&& !this.props.location*/) {
          return (
            <Loading />
          );
      } else {
            return (
            <div className="forecast">
              <Searchbar />
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

