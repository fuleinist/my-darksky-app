import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getWeather, getLocation } from '../actions/index';
import Searchbar from '../containers/Searchbar';
import WeatherView from '../containers/WeatherView'
import WeatherList from '../containers/WeatherList'
import Loading from '../containers/Loading'

import {weekofDay, Capword} from '../components/Functions';
import {cities} from '../sagas/api'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          coords: Object.values(cities).find((cities) => cities.city === (Capword(this.props.match.params.location))),
          error: '',
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
		  const mapdays =  data.map((x,index) => ({id: index, time: x.time, day: weekofDay(x.time)}))
		  let selday = this.props.match.params.day?this.props.match.params.day:'Today';
		  let dayno =  mapdays.find(x => (x.day === Capword(selday)));		  
		  if(Capword(selday)==='Today') dayno = ({id: 0, time: data[0].time, day: weekofDay(data[0].time)})

		  return (
			<div>
				<Loading />
				<WeatherView selectedday={data[dayno.id]} city={this.props.match.params.location} day={this.props.match.params.day} />
				<WeatherList forcastdays={data} city={this.props.match.params.location} day={this.props.match.params.day} />
			</div>
			);
		}
    }
	renderMain = () => {
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
  render() {
	  return (<>{this.renderMain()}</>)
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

Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default Main;