import { put, takeLatest, all } from 'redux-saga/effects';
import { dummyapi } from './api'

export function* getWeather ({location}) {
  const config = {
	  server_url: process.env.REACT_APP_SERVER_URL,
      is_dev: process.env.REACT_APP_ENV === 'dev',
  };
  try {
	  let json = dummyapi.weather;
      if(location) {
            if(!navigator.onLine&&localStorage.getItem('weather')) {
				console.log(localStorage.getItem('weather').json())
                json = localStorage.getItem('weather').json();
            } else {
                let lat = location.lat,lng = location.lon;
				const api_path = config.is_dev?`api/forecast/`:``
				const coords_query = config.is_dev?`?lat=${lat}&lng=${lng}`:`${lat},${lng}?units=auto`
                json = yield fetch( config.server_url + api_path + coords_query).then(response => response.json(), );
                localStorage.setItem('weather', json);
            }
      } else {
//		let latitude = 0,longitude = 0
//		yield json = getCoords(({coords}) => {latitude = coords.latitude; return (coords)}).then(response => response.json(), );
//		yield console.log(json);
	  }
		yield put({ type: "WEATHER_RECEIVED", weather: json });
      } catch (error) {
        yield put({type: "WEATHER_FETCH_FAILED", error});
      }
}

export function* getLocation({location}) {
  try {
      //local server query to fetch city name, country code, long & lat
      let json = (dummyapi.location)[0]
	  if(location) {
		  json = location;
	  }
      //json = yield fetch(`http://localhost:8000/api/location?longitude=${query}`) .then(response => response.json(), );
      yield put({ type: "LOCATION_RECEIVED", location: json, });
      } catch (error) {
          yield put({type: "LOCATION_FETCH_FAILED", error})
      }
}

export function* actionWatcher() {
  yield takeLatest('GET_WEATHER', getWeather)
  yield takeLatest('GET_LOCATION', getLocation)
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}