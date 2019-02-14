import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Skycons from 'react-skycons';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import {weekofDay} from '../components/Functions';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.grey,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

let WeatherList = ({ weather, classes, forcastdays }) => {
    if(weather) {
    return (
    <div className={classes.root}>
        <Fade in={(weather !== null)} >
        <GridList className={classes.gridList} cols={7}>
        {forcastdays.map( tile =>  (
        <GridListTile key={tile.sunriseTime} >
            <Skycons
                    color='black' 
                    icon={tile.icon.toUpperCase().split('-').join('_')} />
            <GridListTileBar
              title={weekofDay(tile.time)}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}</GridList></Fade></div>);
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
  return {  weather: state.weather }
}

WeatherList = connect(
  mapStateToProps,
  null
)(WeatherList)

export default withStyles(styles)(WeatherList);