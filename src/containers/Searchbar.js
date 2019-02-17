import React from 'react';
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { getWeather, getLocation } from '../actions/index';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import {cities} from '../sagas/api'

let suggestions = Object.keys(cities).map(itm => cities[itm]);

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

const renderSuggestion = (suggestion,{ query, isHighlighted }) => {
  const matches = match(suggestion.city, query);
  const parts = parse(suggestion.city, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
	  	<Link to={'/weather/'+ suggestion.city + '/Monday'} style={{textDecoration: 'none',fontFamily: '"Roboto","Helvetica","Arial","sans-serif"',fontSize: '2rem',color: 'inherit',}}>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 600,color: 'red' }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
		}
        )}
		</Link>
      </div>
    </MenuItem>
  );
}

const getSuggestions = (value) => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.city.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const getSuggestionValue = (suggestion) => {
  return suggestion.city;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {  
	  fontSize: '2rem',
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class IntegrationAutosuggest extends React.Component {
  constructor(props) {
    super(props);
	this.state = {
		single: props.city,
		suggestions: [],
	};
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = (name) => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
	let location = this.state.suggestions.find((cities) => (cities.city === newValue))
	this.props.getWeather(location);
    
  };

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search a city)',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
		  )}
        />
      </div>
    );
  }
}

// const mapStateToProps = (state, ownProps) => ({
  // city: state.city,
  // coords: state.coords,
// })

const mapDispatchToProps = {
  getWeather: getWeather,
  getLocation: getLocation,
};

IntegrationAutosuggest = connect(
  null,
  mapDispatchToProps
)(IntegrationAutosuggest)

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);