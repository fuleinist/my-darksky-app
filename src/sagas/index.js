import { put, takeLatest, all } from 'redux-saga/effects';
import dummyapi from './dummyapi'
import {getCoords} from '../components/Functions';		

export function* getWeather ({location}) {
  try {
	  let json = dummyapi.weather, time = new Date();
      if(location) {
		let lat = location.latitude,lng = location.longitude;
		json = yield fetch(`http://localhost:8000/api/forecast/?lat=${lat}&lng=${lng}`).then(response => response.json(), );
	  } else {
//		let latitude = 0,longitude = 0
//		yield json = getCoords(({coords}) => {latitude = coords.latitude; return (coords)}).then(response => response.json(), );
//		yield console.log(json);
	  }
		yield put({ type: "WEATHER_RECEIVED", weather: json });
      } catch (error) {
        yield put({type: "WEATHER_FETCH_FAILED", error})
      }
}

export function* getLocation({location}) {
  try {
      //local server query to fetch city name, country code, long & lat
      let json = (dummyapi.location)[0]
	  if(location) {
		  json = location;
		  console.log(location);
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