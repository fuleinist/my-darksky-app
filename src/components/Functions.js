export const weekofDay = (time) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = new Date(time*1000);
    const dayno = day.getDay();
    return weekday[dayno];
}

//getCoords(fn.callback)
export const getCoords = (callback) => {
  try {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {callback(pos)},
            handleGeolocationError,
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 },
          );
      }
      } catch (error) {
          return { error: error }
    }
}

export const convertTemp = (fa) => {
  let ce = (fa - 32) * 5 / 9
  return  Math.round(ce)
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