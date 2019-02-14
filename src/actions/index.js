export const getWeather = (location) => ({
  type: 'GET_WEATHER',
  location: location,
});

export const getLocation = () => ({
  type: 'GET_LOCATION',
});
