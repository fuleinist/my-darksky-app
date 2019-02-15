const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_WEATHER':
      return { ...state, loading: true };
    case 'WEATHER_RECEIVED':
      return { ...state, weather: action.weather, loading: false };
    case 'WEATHER_FETCH_FAILED':
      return { ...state, error: action, loading: false };
    case 'GET_LOCATION':
      return { ...state, loading: true }      
    case 'LOCATION_RECEIVED':
      return { ...state, location: action.location , loading: true }
    case 'LOCATION_FETCH_FAILED':
      return { ...state, error: action, loading: false };
    case 'SELECT_DAY':
      return { ...state, day: action.day };
    default:
      return state;
  }
};

export default reducer;
