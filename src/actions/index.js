export const getWeather = (location) => ({
  type: 'GET_WEATHER',
  location: location,
});

export const getLocation = (location) => ({
  type: 'GET_LOCATION',
  location: location,
});

export const selectDay = (day) => {
	return {
	  type: 'SELECT_DAY',
	  day: day,
	}
};
