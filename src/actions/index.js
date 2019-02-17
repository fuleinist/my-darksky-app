export const getWeather = (location) => ({
  type: 'GET_WEATHER',
  location: location,
});

//getLocation(location query) Work in Progress
export const getLocation = (location) => ({
  type: 'GET_LOCATION',
  location: location,
});
