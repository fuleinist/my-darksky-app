export const weekofDay = (time) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = new Date(time*1000);
    const dayno = day.getDay();
    return weekday[dayno];
}

//getCoords(fn.callback) Work in Progress
export const getCoords = (callback) => {
  try {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {callback(pos)},
            (err) => {
				if (err.code === 1) {
					  return { error: 'Please enable permissions to access location and reload the page' };
					} else if (err.code === 2 && err.message.match(/^Network location provider at 'https:\/\/www.googleapis.com\/' : Returned error code 403.$/)) {
					  return { error: 'Seems like the internal service for geolocation is down. Please try in a few minutes!' };
					} else {
					  return { error: 'Looks like something went wrong! Please refresh your browser...' };
					}
				},
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 30000 },
          );
      }
      } catch (error) {
          return { error: error }
    }
}

export const convertTemp = (temp) => {
  let ce = temp
  return  Math.round(ce)
}

export const Capword = (word) => {
  let upper = word.charAt(0).toUpperCase() + word.substr(1);
  return  upper
}

