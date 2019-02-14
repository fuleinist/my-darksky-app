import React from 'react';
import { connect } from 'react-redux';
import Skycons from 'react-skycons';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import {weekofDay} from '../components/Functions';


const styles = theme => ({
  root: {
    display: 'block',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    border: '1px solid black',
  },
  View: {
      width:'50%',
  },  
  Temperature: {
      width: '50%',
      float: 'right'
  },
  topBar: {
      position: 'absolute',
      border: '1px solid black',
      top: '0px',
      width:'200px',
      height: '80px',
  },
  topTitle: {
    marginLeft: '10px',
    color: '#000',
    fontSize: '2rem',
    lineHeight: '5rem',
  },
  bottomBar: {
      position: 'absolute',
      bottom: '0px',
      height: '80px',
      width: '100%',
      background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  bottomTitle: {
    marginLeft: '30px',
    color: '#fff',
    fontSize: '2rem',
    lineHeight: '5rem',
  }
});

let WeatherList = ({ weather, classes, selectedday, city, loading }) => {

    if(weather&&city&&!loading) {
        return (
            <div key={selectedday.sunriseTime}  className={classes.root}>
                <Fade in={(weather !== null)}>
                    <Skycons
                    className={classes.View}
                    color='black' 
                    icon={selectedday.icon.toUpperCase().split('-').join('_')}
                    autoplay={true} />
                </Fade>
		<Fade in={(weather !== null)}>
		    <div className={classes.Temperature}>
			 {(selectedday.temperatureLow + selectedday.temperatureLow)/2}
		    </div>
		</Fade>
                <div className={classes.topBar}>                    
                    <span className={classes.topTitle}>{weekofDay(selectedday.time)}</span>
                </div>
                <div className={classes.bottomBar}>                    
                    <span className={classes.bottomTitle}>{( city + ' ' + selectedday.summary ) }</span>
                </div>                
            </div> )
    } else {
        return null;
    }
}

const mapStateToProps = (state) => ({
  weather: state.weather,
  loading: state.loading
})

WeatherList = connect(
  mapStateToProps,
  null
)(WeatherList)

export default withStyles(styles)(WeatherList);