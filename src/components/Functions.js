export const weekofDay = (time) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = new Date(time*1000);
    const dayno = day.getDay();
    return weekday[dayno];
}

export const getCoords = () => {
  try {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            handleGeolocationSuccess,
            handleGeolocationError,
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 },
          );
      }
      } catch (error) {
          return { error: error }
    }
}

const handleGeolocationSuccess = (position) => {
    return position.coords;
}

const handleGeolocationError = (error) => {
    if (error.code === 1) {
      return { error: 'Please enable permissions to access location and reload the page' };
    } else if (error.code === 2 && error.message.match(/^Network location provider at 'https:\/\/www.googleapis.com\/' : Returned error code 403.$/)) {
      return { error: 'Seems like the internal service for geolocation is down. Please try in a few minutes!' };
    } else {
      return { error: 'Looks like something went wrong! Please refresh your browser...' };
    }
}