export const getWeather = (coords) => ({
  type: 'GET_WEATHER',
  coords: coords,
});

export const getLocation = () => ({
  type: 'GET_LOCATION',
});
